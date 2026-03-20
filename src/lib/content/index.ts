import { prompts as legacyPrompts } from "@/lib/prompts";
import { guides as legacyGuides } from "@/lib/guides";

import {
  getAllPromptsFromContent,
  type PromptItem,
} from "@/lib/content/prompts";

import {
  getAllGuidesFromContent,
  type GuideItem,
} from "@/lib/content/guides";

function isDraftItem(item: unknown): boolean {
  return Boolean(
    item &&
      typeof item === "object" &&
      "draft" in item &&
      (item as { draft?: boolean }).draft === true
  );
}

function isNoindexItem(item: unknown): boolean {
  return Boolean(
    item &&
      typeof item === "object" &&
      "noindex" in item &&
      (item as { noindex?: boolean }).noindex === true
  );
}

// ===== PROMPTS =====
export function getAllPromptsMerged(): PromptItem[] {
  const cms = getAllPromptsFromContent();
  const map = new Map<string, PromptItem>();

  for (const item of legacyPrompts) {
    if (isDraftItem(item)) continue;
    map.set(item.id, item);
  }

  for (const item of cms) {
    if (isDraftItem(item)) continue;
    map.set(item.id, item); // CMS pisa legacy si coincide el id
  }

  return Array.from(map.values()).sort(
    (a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      a.title.localeCompare(b.title)
  );
}

export function getPromptByIdMerged(id: string): PromptItem | null {
  return getAllPromptsMerged().find((item) => item.id === id) ?? null;
}

export function getPromptIdsMerged(): string[] {
  return getAllPromptsMerged()
    .filter((item) => !isNoindexItem(item))
    .map((item) => item.id);
}

// ===== GUIDES =====
export function getAllGuidesMerged(): GuideItem[] {
  const cms = getAllGuidesFromContent();
  const map = new Map<string, GuideItem>();

  for (const item of legacyGuides) {
    if (isDraftItem(item)) continue;
    map.set(item.id, item);
  }

  for (const item of cms) {
    if (isDraftItem(item)) continue;
    map.set(item.id, item); // CMS pisa legacy si coincide el id
  }

  return Array.from(map.values()).sort(
    (a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      a.title.localeCompare(b.title)
  );
}

export function getGuideByIdMerged(id: string): GuideItem | null {
  return getAllGuidesMerged().find((item) => item.id === id) ?? null;
}

export function getGuideIdsMerged(): string[] {
  return getAllGuidesMerged()
    .filter((item) => !isNoindexItem(item))
    .map((item) => item.id);
}