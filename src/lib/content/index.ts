import {
  prompts as legacyPrompts,
  type PromptItem as LegacyPromptItem,
} from "@/lib/prompts";
import {
  guides as legacyGuides,
  type GuideItem as LegacyGuideItem,
} from "@/lib/guides";

import {
  getAllPromptsFromContent,
  type PromptItem as ContentPromptItem,
} from "@/lib/content/prompts";

import {
  getAllGuidesFromContent,
  type GuideItem as ContentGuideItem,
} from "@/lib/content/guides";
import { isGuideIndexable } from "@/lib/guide-policy";

function normalizeLegacyPrompt(item: LegacyPromptItem): ContentPromptItem {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    prompt: item.prompt,
    tags: item.tags,
    featured: item.featured,
    draft: item.draft,
    noindex: item.noindex,
    seoTitle: item.seoTitle,
    seoDescription: item.seoDescription,
    updatedAt: item.updatedAt,
  };
}

function normalizeLegacyGuide(item: LegacyGuideItem): ContentGuideItem {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    content: item.content,
    tags: item.tags,
    featured: item.featured,
    draft: item.draft,
    noindex: item.noindex,
    editorialStatus: item.editorialStatus || "published",
    seoTitle: item.seoTitle,
    seoDescription: item.seoDescription,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    image: item.image,
    author: item.author,
  };
}

// ===== PROMPTS =====
export function getAllPromptsMerged(): ContentPromptItem[] {
  const cms = getAllPromptsFromContent();
  const map = new Map<string, ContentPromptItem>();

  for (const item of legacyPrompts) {
    const normalized = normalizeLegacyPrompt(item);
    if (normalized.draft) continue;
    map.set(normalized.id, normalized);
  }

  for (const item of cms) {
    if (item.draft) continue;
    map.set(item.id, item);
  }

  return Array.from(map.values()).sort(
    (a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      a.title.localeCompare(b.title)
  );
}

export function getPromptByIdMerged(id: string): ContentPromptItem | null {
  return getAllPromptsMerged().find((item) => item.id === id) ?? null;
}

export function getPromptIdsMerged(): string[] {
  return getAllPromptsMerged()
    .filter((item) => !item.noindex)
    .map((item) => item.id);
}

// ===== GUIDES =====
export function getAllGuidesMerged(): ContentGuideItem[] {
  const cms = getAllGuidesFromContent();
  const map = new Map<string, ContentGuideItem>();

  for (const item of legacyGuides) {
    const normalized = normalizeLegacyGuide(item);
    map.set(normalized.id, normalized);
  }

  for (const item of cms) {
    map.set(item.id, item);
  }

  return Array.from(map.values()).filter(item => !item.draft).sort(
    (a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      a.title.localeCompare(b.title)
  );
}

export function getGuideByIdMerged(id: string): ContentGuideItem | null {
  return getAllGuidesMerged().find((item) => item.id === id) ?? null;
}

export function getGuideIdsMerged(): string[] {
  // Routing includes archives and noindex pages; discovery uses getPublishedGuides.
  return getAllGuidesMerged().map((item) => item.id);
}

export function getPublishedGuides(): ContentGuideItem[] {
  return getAllGuidesMerged().filter(isGuideIndexable);
}
