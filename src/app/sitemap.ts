import type { MetadataRoute } from "next";
import { getAllPromptsMerged, getPublishedGuides } from "@/lib/content";

export const dynamic = "force-static";

const SITE_URL = "https://www.oriavision.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const prompts = getAllPromptsMerged()
    .filter((p) => !p.noindex)
    .map((p) => ({
      url: `${SITE_URL}/prompts/${p.id}/`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const guides = getPublishedGuides()
    .map((g) => ({
      url: `${SITE_URL}/guias/${g.id}/`,
      lastModified: g.updatedAt
        ? new Date(g.updatedAt)
        : g.publishedAt
        ? new Date(g.publishedAt)
        : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/proyectos/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/trabajos-realizados/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/prompts/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guias/`,
      // Actual editorial revision, not the date of every subsequent build.
      lastModified: new Date("2026-10-15"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/inbox/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/inbox/terminos/`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/inbox/privacidad/`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/inbox/seguridad/`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/legal/privacidad/`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/legal/terminos/`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    ...["diseno-web", "seo", "marketing-digital", "meta-ads", "google-ads"].map(path => ({
      url: `${SITE_URL}/${path}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9,
    })),
    ...prompts,
    ...guides,
  ];
}
