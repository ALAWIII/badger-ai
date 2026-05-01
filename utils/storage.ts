// utils/storage.ts
import type { AIProvider, Prompt } from "./models";

export async function addPrompt(prompt: Prompt): Promise<void> {
  const prompts = await getPrompts();
  await savePrompts([...prompts, prompt]);
}

export async function getPrompts(): Promise<Prompt[]> {
  const { prompts = [] } = await browser.storage.local.get("prompts");
  return prompts as Prompt[];
}
export async function savePrompts(prompts: Prompt[]): Promise<void> {
  await browser.storage.local.set({ prompts });
}
export async function updatePrompt(updatedPrompt: Prompt): Promise<void> {
  const prompts = await getPrompts();

  const updatedPrompts = prompts.map((p) =>
    p.id === updatedPrompt.id ? updatedPrompt : p,
  );

  await savePrompts(updatedPrompts);
}
export async function deletePrompt(id: string): Promise<void> {
  const prompts = await getPrompts();
  await savePrompts(prompts.filter((p) => p.id !== id));
}
// utils/storage.ts
export async function reorderPrompts(from: number, to: number): Promise<void> {
  const prompts = await getPrompts();
  const [moved] = prompts.splice(from, 1);
  prompts.splice(to, 0, moved);
  await savePrompts(prompts);
}

// providers functionalities
export async function addProvider(provider: AIProvider): Promise<void> {
  const providers = await getProviders();
  await saveProviders([...providers, provider]);
}
export async function getProviders(): Promise<AIProvider[]> {
  const { providers = [] } = await browser.storage.local.get("providers");
  return providers as AIProvider[];
}
export async function updateProvider(
  updatedProvider: AIProvider,
): Promise<void> {
  const providers = await getProviders();

  const updatedProviders = providers.map((p) =>
    p.id === updatedProvider.id ? updatedProvider : p,
  );

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

export async function deleteProvider(id: string): Promise<void> {
  const providers = await getProviders();
  await saveProviders(providers.filter((p) => p.id !== id));
}

export async function reorderProviders(
  from: number,
  to: number,
): Promise<void> {
  const providers = await getProviders();
  const [moved] = providers.splice(from, 1);
  providers.splice(to, 0, moved);
  await saveProviders(providers);
}
