export function normalizeGuideSearch(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").replace(/\s+/g, " ").trim();
}

export function matchesGuideSearch(searchText: string, query: string): boolean {
  return normalizeGuideSearch(query).split(" ").every(word => searchText.includes(word));
}

export function makeGuideSearchText(guide: { title: string; description: string; category: string; tags?: string[]; content: string }): string {
  return normalizeGuideSearch([guide.title, guide.description, guide.category, ...(guide.tags || []), guide.content].join(" "));
}
