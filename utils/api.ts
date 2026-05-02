// utils/api.ts
import { getErrorMessage } from "./errors";
import type { TemplateVars } from "./models";

function normalizeText(value: unknown): string {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .trim();
}

function plainString(value: unknown): string {
  return String(value ?? "");
}

function asJsonLiteral(value: unknown): string {
  return JSON.stringify(value ?? "");
}

function asJsonStringContent(value: unknown): string {
  return asJsonLiteral(value).slice(1, -1);
}

function buildTemplateMap(vars: TemplateVars): Record<string, string> {
  if (!vars.provider) {
    throw new Error("No provider selected");
  }

  return {
    apiKey: plainString(vars.provider.apiKey),
    model: plainString(vars.provider.model ?? ""),
    systemPrompt: normalizeText(vars.prompt.systemPrompt ?? ""),
    selectedText: normalizeText(vars.selectedText ?? ""),
  };
}

function resolveTemplate(vars: TemplateVars): string {
  if (!vars.provider) {
    throw new Error("No provider selected");
  }

  const map = buildTemplateMap(vars);
  let template = vars.provider.requestTemplate;

  // Case 1: placeholder is the whole JSON string value
  // Example: "content":"{{selectedText}}"
  template = template.replace(/"\{\{(\w+)\}\}"/g, (match, key: string) => {
    if (!(key in map)) return match;
    return asJsonLiteral(map[key]);
  });

  // Case 2: placeholder is embedded inside a larger JSON string
  // Example: "Authorization":"Bearer {{apiKey}}"
  template = template.replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
    if (!(key in map)) return match;
    return asJsonStringContent(map[key]);
  });

  return template;
}

function extractResponse(data: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((obj, key) => {
    if (obj == null) return undefined;

    if (Array.isArray(obj)) {
      const index = Number(key);
      return Number.isInteger(index) ? obj[index] : undefined;
    }

    if (typeof obj === "object") {
      return (obj as Record<string, unknown>)[key];
    }

    return undefined;
  }, data);
}

function stringifyResult(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    const text = value
      .map((item) => {
        if (typeof item === "string") return item;
        if (
          item &&
          typeof item === "object" &&
          "text" in item &&
          typeof (item as Record<string, unknown>).text === "string"
        ) {
          return (item as Record<string, string>).text;
        }
        return "";
      })
      .filter(Boolean)
      .join("\n")
      .trim();

    return text;
  }

  return "";
}

async function readErrorDetails(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") ?? "";

  try {
    if (contentType.includes("application/json")) {
      const data = await response.json();

      const detail =
        extractResponse(data, "error.message") ??
        extractResponse(data, "message") ??
        extractResponse(data, "detail") ??
        extractResponse(data, "details") ??
        extractResponse(data, "error");

      if (typeof detail === "string" && detail.trim()) {
        return detail.trim();
      }

      return JSON.stringify(data);
    }

    const text = await response.text();
    return text.trim();
  } catch {
    return "";
  }
}

export async function sendPrompt(vars: TemplateVars): Promise<string> {
  if (!vars.provider) {
    throw new Error("No provider selected");
  }

  let resolvedTemplate: string;
  try {
    resolvedTemplate = resolveTemplate(vars);
  } catch (e) {
    throw new Error(`Template resolution failed: ${getErrorMessage(e)}`);
  }

  let fetchOptions: RequestInit & { body?: unknown };
  try {
    const parsed = JSON.parse(resolvedTemplate);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Request template must resolve to a JSON object");
    }

    fetchOptions = parsed as RequestInit & { body?: unknown };
  } catch (e) {
    throw new Error(
      `Invalid JSON after template substitution — check your request template: ${getErrorMessage(e)}`,
    );
  }

  if (fetchOptions.body != null && typeof fetchOptions.body !== "string") {
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  let response: Response;
  try {
    response = await fetch(vars.provider.url, fetchOptions);
  } catch (e) {
    throw new Error(
      `Network error — check your URL or internet connection: ${getErrorMessage(e)}`,
    );
  }

  if (!response.ok) {
    const details = await readErrorDetails(response);
    throw new Error(
      details
        ? `Provider rejected the request (${response.status}): ${details}`
        : `Provider rejected the request (${response.status}) — check your API key or request template`,
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new Error("Provider returned non-JSON response — check your URL");
  }

  const rawResult = extractResponse(data, vars.provider.responsePath);
  const result = stringifyResult(rawResult);

  if (!result) {
    throw new Error(
      `Could not extract response at path "${vars.provider.responsePath}" — check your response path`,
    );
  }

  return result;
}
