import type { MetadataRoute } from "next";
import { getAllPromptsMerged, getAllGuidesMerged } from "@/lib/content";

export const dynamic = "force-static";

const SITE_URL = "https://www.oriavision.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const prompts = getAllPromptsMerged().map((p) => ({
    url: `${SITE_URL}/prompts/${p.id}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const guides = getAllGuidesMerged().map((g) => ({
    url: `${SITE_URL}/guias/${g.id}/`,
    lastModified: now,
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
      url: `${SITE_URL}/prompts/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guias/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/web/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
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
    ...prompts,
    ...guides,
  ];
}