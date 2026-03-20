import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PromptCategory = string;

export type PromptItem = {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  prompt: string;
  tags?: string[];
  featured?: boolean;
  draft?: boolean;
  noindex?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt?: string;
};

const DIR = path.join(process.cwd(), "content", "prompts");

export function getAllPromptsFromContent(): PromptItem[] {
  if (!fs.existsSync(DIR)) return [];

  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));

  const items = files.map((file) => {
    const id = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(DIR, file), "utf8");
    const { data, content } = matter(raw);

    return {
      id,
      title: String(data.title ?? id),
      description: String(data.description ?? ""),
      category: String(data.category ?? "General"),
      prompt: content.trim(),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      featured: Boolean(data.featured ?? false),
      draft: Boolean(data.draft ?? false),
      noindex: Boolean(data.noindex ?? false),
      seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
      seoDescription: data.seoDescription ? String(data.seoDescription) : undefined,
      updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    };
  });

  items.sort(
    (a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      a.title.localeCompare(b.title)
  );

  return items;
}

export function getPromptByIdFromContent(id: string): PromptItem | null {
  const file = path.join(DIR, `${id}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  return {
    id,
    title: String(data.title ?? id),
    description: String(data.description ?? ""),
    category: String(data.category ?? "General"),
    prompt: content.trim(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    featured: Boolean(data.featured ?? false),
    draft: Boolean(data.draft ?? false),
    noindex: Boolean(data.noindex ?? false),
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    seoDescription: data.seoDescription ? String(data.seoDescription) : undefined,
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
  };
}