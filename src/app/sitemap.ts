import type { MetadataRoute } from "next";
import { getAllPromptsMerged, getPublishedGuides } from "@/lib/content";

export const dynamic = "force-static";

const SITE_URL = "https://www.oriavision.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const prompts = getAllPromptsMerged()
    .filter((p) => !p.noindex)
    .map((p) => ({
      url: `${SITE_URL}/prompts/${p.id}/`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
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

  const guideDates = guides.flatMap(g => g.lastModified ? [g.lastModified.getTime()] : []);

  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/proyectos/`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/trabajos-realizados/`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/prompts/`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guias/`,
      // Latest known content revision; never substitute the build date.
      lastModified: guideDates.length ? new Date(Math.max(...guideDates)) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/inbox/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/inbox/terminos/`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/inbox/privacidad/`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/inbox/seguridad/`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/legal/privacidad/`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/legal/terminos/`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    ...["diseno-web", "seo", "marketing-digital", "meta-ads", "google-ads"].map(path => ({
      url: `${SITE_URL}/${path}/`, changeFrequency: "monthly" as const, priority: 0.9,
    })),
    ...prompts,
    ...guides,
  ];
}
