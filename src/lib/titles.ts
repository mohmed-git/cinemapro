/**
 * Title loader.
 * Reads from src/data/generated/all.json (trimmed in low-memory environments
 * via scripts/trim-data.mjs; the original is preserved as all.full.json).
 */
import { readFileSync } from 'node:fs';
import type { Title, TitleIndexEntry } from './types';
import { splitGenres } from './detailContent';

const ALL_TITLES: Title[] = JSON.parse(
  readFileSync(`${process.cwd()}/src/data/generated/all.json`, 'utf8')
) as Title[];

// Build a slug → Title map for quick lookup
const bySlug = new Map<string, Title>();
for (const t of ALL_TITLES) bySlug.set(t.slug, t);

export function getAllTitles(): Title[] {
  return ALL_TITLES;
}

export function getTitlesByCategory(category: Title['category']): Title[] {
  return ALL_TITLES.filter((t) => t.category === category);
}

export function getTitleBySlug(slug: string): Title | undefined {
  return bySlug.get(slug);
}

/** Tiny entry used in listings / cards */
export function toIndexEntry(t: Title): TitleIndexEntry {
  const genres = splitGenres(t.genre);
  return {
    slug: t.slug,
    clean_title: t.clean_title,
    category: t.category,
    category_label: t.category_label,
    poster: t.poster,
    seasons_count: t.seasons_count,
    episodes_count: t.episodes_count,
    url: t.url,
    has_multiple_seasons: t.seasons_count > 1,
    year: t.year || null,
    genres,
  };
}

export function sortByAlpha(titles: Title[]): Title[] {
  return [...titles].sort((a, b) =>
    a.clean_title.localeCompare(b.clean_title, 'ar')
  );
}

export function sortByEpisodes(titles: Title[]): Title[] {
  return [...titles].sort((a, b) => b.episodes_count - a.episodes_count);
}

/** Similar works: prefer overlapping genres, then keep a deterministic order. */
export function getSimilarTitles(current: Title, limit = 12): Title[] {
  const currentGenres = new Set(splitGenres(current.genre));
  const currentCountry = current.country || '';
  const sameCat = getTitlesByCategory(current.category).filter(
    (t) => t.slug !== current.slug
  );
  const hash = [...current.slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0);
  const sorted = sameCat
    .map((t, i) => {
      const genreScore = splitGenres(t.genre).reduce(
        (score, genre) => score + (currentGenres.has(genre) ? 1 : 0),
        0
      );
      const countryScore = currentCountry && t.country === current.country ? 1 : 0;
      const yearScore = current.year && t.year === current.year ? 1 : 0;
      return {
        t,
        score: genreScore * 10 + countryScore * 2 + yearScore,
        key: (i * 2654435761 + hash) >>> 0,
      };
    })
    .sort((a, b) => (b.score - a.score) || (a.key - b.key))
    .map((x) => x.t);
  return sorted.slice(0, limit);
}
