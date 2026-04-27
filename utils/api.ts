// utils/api.ts
import { TemplateVars } from "./models";

/**
 * substitutes fields values against requestTemplate placeholders and prepare the full request to be sent.
 */
function resolveTemplate(vars: TemplateVars): any {
  const map: Record<string, string> = {
    apiKey: vars.provider.apiKey,
    model: vars.provider.model ?? "",
    systemPrompt: vars.prompt.systemPrompt,
    selectedText: vars.selectedText,
  };

  const resolved = vars.provider.requestTemplate.replace(
    /\{\{(\w+)\}\}/g,
    (_, key) => (key in map ? map[key] : `{{${key}}}`),
  );

  return JSON.parse(resolved);
}
function extractResponse(data: any, path: string): string {
  return path.split(".").reduce((obj, key) => obj?.[key], data);
}
function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  return String(e);
}
export async function sendPrompt(template: TemplateVars): Promise<string> {
  let resolvedOptions: string;
  try {
    resolvedOptions = resolveTemplate(template);
  } catch (e) {
    throw new Error(`Template resolution failed: ${getErrorMessage(e)}`);
  }

  let fetchOptions: any;
  try {
    fetchOptions = JSON.parse(resolvedOptions);
  } catch (e) {
    throw new Error(
      `Invalid JSON after template substitution — check your request template: ${getErrorMessage(e)}`,
    );
  }

  let response: Response;
  try {
    response = await fetch(template.provider.baseUrl, fetchOptions);
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
  } catch (e) {
    throw new Error(
      `Provider returned non-JSON response — check your base URL`,
    );
  }

  const result = extractResponse(data, template.provider.responsePath);
  if (!result) {
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
