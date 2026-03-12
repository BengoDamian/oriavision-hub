import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type GuideCategory = string;

export type GuideItem = {
  id: string;
  title: string;
  description: string;
  category: GuideCategory;
  content: string;
  tags?: string[];
  featured?: boolean;
};

const DIR = path.join(process.cwd(), "content", "guides");

export function getAllGuidesFromContent(): GuideItem[] {
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
      content: content.trim(),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      featured: Boolean(data.featured ?? false),
    };
  });

  items.sort(
    (a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title)
  );

  return items;
}

export function getGuideByIdFromContent(id: string): GuideItem | null {
  const file = path.join(DIR, `${id}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  return {
    id,
    title: String(data.title ?? id),
    description: String(data.description ?? ""),
    category: String(data.category ?? "General"),
    content: content.trim(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    featured: Boolean(data.featured ?? false),
  };
}