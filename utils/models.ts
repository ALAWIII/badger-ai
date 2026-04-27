export interface Prompt {
  id: string; // uuid
  label: string; // display name in the list
  systemPrompt: string; // supports {{selected_text}} placeholder
  providerId: string | null; // null = ask on fly
}
export interface AIProvider {
  id: string; //uuid
  name: string;
  apiKey: string;
  baseUrl: string;
  model?: string;
  requestTemplate: string; // user writes/pastes this
}
