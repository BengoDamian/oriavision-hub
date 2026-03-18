import type { MetadataRoute } from "next";
import { getAllPromptsMerged, getAllGuidesMerged } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.oriavision.com.ar";
  const now = new Date();

  const prompts = getAllPromptsMerged().map((p) => ({
    url: `${base}/prompts/${p.id}/`,
    lastModified: now,
  }));

  const guides = getAllGuidesMerged().map((g) => ({
    url: `${base}/guias/${g.id}/`,
    lastModified: now,
  }));

  return [
    {
      url: `${base}/`,
      lastModified: now,
    },
    {
      url: `${base}/prompts/`,
      lastModified: now,
    },
    {
      url: `${base}/guias/`,
      lastModified: now,
    },
    {
      url: `${base}/web/`,
      lastModified: now,
    },
    {
      url: `${base}/legal/privacidad/`,
      lastModified: now,
    },
    {
      url: `${base}/legal/terminos/`,
      lastModified: now,
    },
    ...prompts,
    ...guides,
  ];
}