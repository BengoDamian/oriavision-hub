export type GuideEditorialStatus = "published" | "archived";

type GuidePolicy = {
  editorialStatus?: GuideEditorialStatus;
  draft?: boolean;
  noindex?: boolean;
};

// Archived guides remain routable for newsletter links, but never enter discovery.
export function isGuideIndexable(guide: GuidePolicy): boolean {
  return !guide.draft && !guide.noindex && guide.editorialStatus !== "archived";
}

export function parseGuideEditorialStatus(value: unknown): GuideEditorialStatus {
  if (value === undefined || value === "published") return "published";
  if (value === "archived") return "archived";
  throw new Error(`Invalid guide editorialStatus: ${String(value)}`);
}
