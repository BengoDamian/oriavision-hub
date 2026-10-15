import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { parseGuideEditorialStatus, type GuideEditorialStatus } from "@/lib/guide-policy";

export type GuideItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  tags?: string[];
  featured?: boolean;
  draft?: boolean;
  noindex?: boolean;
  editorialStatus?: GuideEditorialStatus;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  updatedAt?: string;
  image?: string;
  imageSmall?: string;
  imageAlt?: string;
  takeaways?: string[];
  relatedGuides?: string[];
  author?: string;
  contactMessage?: string;
  contactTitle?: string;
};

const DIR = path.join(process.cwd(), "content", "guides");

function readGuide(file: string): GuideItem {
  const id = path.basename(file, ".md");
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const text = (key: string) => data[key] ? String(data[key]) : undefined;
  const list = (key: string) => Array.isArray(data[key]) ? data[key].map(String) as string[] : undefined;
  // Quoted dates are recommended; YAML dates are normalized without changing them.
  const date = (key: string) => data[key] instanceof Date ? data[key].toISOString().slice(0, 10) : text(key);
  return {
    id, content: content.trim(), title: String(data.title ?? id),
    description: String(data.description ?? ""), category: String(data.category ?? "General"),
    tags: list("tags"), featured: Boolean(data.featured), draft: Boolean(data.draft), noindex: Boolean(data.noindex),
    editorialStatus: parseGuideEditorialStatus(data.editorialStatus),
    seoTitle: text("seoTitle"), seoDescription: text("seoDescription"),
    publishedAt: date("publishedAt"), updatedAt: date("updatedAt"),
    image: text("image"), imageSmall: text("imageSmall"), imageAlt: text("imageAlt"),
    takeaways: list("takeaways"), relatedGuides: list("relatedGuides"),
    author: text("author"), contactMessage: text("contactMessage"), contactTitle: text("contactTitle"),
  };
}

export function getAllGuidesFromContent(): GuideItem[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter(file => file.endsWith(".md"))
    .map(file => readGuide(path.join(DIR, file)))
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.title.localeCompare(b.title, "es"));
}
