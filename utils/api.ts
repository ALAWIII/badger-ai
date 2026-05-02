// utils/api.ts
import { getErrorMessage } from "./errors";
import { TemplateVars } from "./models";

function resolveTemplate(vars: TemplateVars): string {
  const map: Record<string, string> = {
    apiKey: vars.provider.apiKey,
    model: vars.provider.model ?? "",
    systemPrompt: vars.prompt.systemPrompt ?? "",
    selectedText: vars.selectedText,
  };

  return vars.provider.requestTemplate.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    key in map ? map[key] : `{{${key}}}`,
  );
}

function extractResponse(data: any, path: string): string {
  return path.split(".").reduce((obj, key) => obj?.[key], data);
}

export async function sendPrompt(template: TemplateVars): Promise<string> {
  let resolvedTemplate: string;
  try {
    resolvedTemplate = resolveTemplate(template);
  } catch (e) {
    throw new Error(`Template resolution failed: ${getErrorMessage(e)}`);
  }

  let fetchOptions: any;
  try {
    fetchOptions = JSON.parse(resolvedTemplate);
  } catch (e) {
    throw new Error(
      `Invalid JSON after template substitution — check your request template: ${getErrorMessage(e)}`,
    );
  }

  if (fetchOptions.body && typeof fetchOptions.body !== "string") {
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  let response: Response;
  try {
    response = await fetch(template.provider.url, fetchOptions);
  } catch (e) {
    throw new Error(
      `Network error — check your base URL or internet connection: ${getErrorMessage(e)}`,
    );
  }

  if (!response.ok) {
    throw new Error(
      `Provider rejected the request (${response.status}) — check your API key or request template`,
    );
  }

  let data: any;
  try {
    data = await response.json();
  } catch {
    throw new Error(
      `Provider returned non-JSON response — check your base URL`,
    );
  }

  const result = extractResponse(data, template.provider.responsePath);

  if (typeof result !== "string" || !result.trim()) {
    throw new Error(
      `Could not extract response at path "${template.provider.responsePath}" — check your response path`,
    );
  }

  return result;
}
/*
template example:
{
  "method": "POST",
  "headers": {
    "Authorization": "Bearer {{apiKey}}",
    "Content-Type": "application/json"
  },
  "body": {
    "model": "{{model}}",
    "messages": [
      { "role": "system", "content": "{{promptTemplate}}" },
      { "role": "user", "content": "{{selectedText}}" }
    ],
    "temperature": 0.7,
    "max_tokens": 1000
  }
}
*/
