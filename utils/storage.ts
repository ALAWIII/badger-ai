// utils/storage.ts
import type { AIProvider, Prompt } from "./models";

export async function addPrompt(
  promptsList: Prompt[],
  prompt: Prompt,
): Promise<void> {
  await savePrompts([...promptsList, prompt]);
}

export async function getPrompts(): Promise<Prompt[]> {
  const { prompts = [] } = await browser.storage.local.get("prompts");
  return prompts as Prompt[];
}
export async function savePrompts(prompts: Prompt[]): Promise<void> {
  await browser.storage.local.set({ prompts });
}
export async function upsertPrompt(
  promptsList: Prompt[],
  updatedPrompt: Prompt,
): Promise<void> {
  const exists = promptsList.some((p) => p.id === updatedPrompt.id);

  const updatedPrompts = exists
    ? promptsList.map((p) => (p.id === updatedPrompt.id ? updatedPrompt : p))
    : [...promptsList, updatedPrompt];

  await savePrompts(updatedPrompts);
}
export async function deletePrompt(
  promptsList: Prompt[],
  id: string,
): Promise<void> {
  await savePrompts(promptsList.filter((p) => p.id !== id));
}
// utils/storage.ts
export async function reorderPrompts(promptsList: Prompt[]): Promise<void> {
  await savePrompts([...promptsList]);
}

// providers functionalities
export async function addProvider(
  providersList: AIProvider[],
  provider: AIProvider,
): Promise<void> {
  await saveProviders([...providersList, provider]);
}
export async function getProviders(): Promise<AIProvider[]> {
  const { providers = [] } = await browser.storage.local.get("providers");
  return providers as AIProvider[];
}
export async function updateProvider(
  providersList: AIProvider[],
  updatedProvider: AIProvider,
): Promise<void> {
  const exists = providersList.some((p) => p.id === updatedProvider.id);

  const updatedProviders = exists
    ? providersList.map((p) =>
        p.id === updatedProvider.id ? updatedProvider : p,
      )
    : [...providersList, updatedProvider];

  await saveProviders(updatedProviders);
}
export async function saveProviders(providers: AIProvider[]): Promise<void> {
  await browser.storage.local.set({ providers });
}

export async function getDefaultProviderId(): Promise<string | null> {
  const { defaultProviderId = null } =
    await browser.storage.local.get("defaultProviderId");
  return defaultProviderId as string | null;
}
export async function saveDefaultProviderId(id: string | null): Promise<void> {
  await browser.storage.local.set({ defaultProviderId: id });
}

export async function deleteProvider(
  providersList: AIProvider[],
  id: string,
): Promise<void> {
  await saveProviders(providersList.filter((p) => p.id !== id));
}

export async function reorderProviders(
  providersList: AIProvider[],
): Promise<void> {
  await saveProviders([...providersList]);
}
