/** Both historical briefs and the evidence-reviewed series share discovery. */
export const isDailySlug = (id: string) => /^(?:en\/|zh\/)?(?:openclaw|ai)-daily-\d{4}-\d{2}-\d{2}(?:\.md)?$/.test(id);
