import { guides as legacyGuides } from "@/lib/guides";
import { prompts as legacyPrompts } from "@/lib/prompts";

import {
  getAllGuidesFromContent,
  getGuideByIdFromContent,
  type GuideItem,
} from "@/lib/content/guides";

import {
  getAllPromptsFromContent,
  getPromptByIdFromContent,
  type PromptItem,
} from "@/lib/content/prompts";

// ===== GUIDES =====
export function getAllGuidesMerged(): GuideItem[] {
  const cms = getAllGuidesFromContent();
  const map = new Map<string, GuideItem>();

  for (const item of legacyGuides) map.set(item.id, item);
  for (const item of cms) map.set(item.id, item);

  return Array.from(map.values()).sort(
    (a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title)
  );
}

export function getGuideByIdMerged(id: string): GuideItem | null {
  const cms = getGuideByIdFromContent(id);
  if (cms) return cms;
  return legacyGuides.find((g) => g.id === id) ?? null;
}

export function getGuideIdsMerged(): string[] {
  return getAllGuidesMerged().map((g) => g.id);
}

// ===== PROMPTS =====
export function getAllPromptsMerged(): PromptItem[] {
  const cms = getAllPromptsFromContent();
  const map = new Map<string, PromptItem>();

  for (const item of legacyPrompts) map.set(item.id, item);
  for (const item of cms) map.set(item.id, item);

  return Array.from(map.values()).sort(
    (a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title)
  );
}

export function getPromptByIdMerged(id: string): PromptItem | null {
  const cms = getPromptByIdFromContent(id);
  if (cms) return cms;
  return legacyPrompts.find((p) => p.id === id) ?? null;
}

export function getPromptIdsMerged(): string[] {
  return getAllPromptsMerged().map((p) => p.id);
}