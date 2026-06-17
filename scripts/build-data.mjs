import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const titlesDir = path.join(rootDir, 'src', 'data', 'titles');
const generatedDir = path.join(rootDir, 'src', 'data', 'generated');
const IMAGE_BASE_URL = 'https://pub-7bd753a4463049929e562aa677ad4251.r2.dev';

function normalizeImageUrl(value) {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  const match = trimmed.match(/^\/?images\/(.+)$/i);
  if (!match) return value;
  return `${IMAGE_BASE_URL}/${match[1].replace(/^\/+/, '')}`;
}

function sanitizeBrand(value) {
  if (typeof value === 'string') {
    return normalizeImageUrl(
      value
        .replace(/Flixora/gi, 'CINMAPRO')
        .replace(/فليكسورا/g, 'CINMAPRO')
        .replace(/Cinmapro/g, 'CINMAPRO')
    );
  }
  if (Array.isArray(value)) return value.map(sanitizeBrand);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, sanitizeBrand(nested)])
    );
  }
  return value;
}

function compactDescription(value) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  return text.length > 220 ? text.slice(0, 220) : text;
}

function toIndexEntry(title) {
  return {
    slug: title.slug,
    clean_title: title.clean_title,
    category: title.category,
    category_label: title.category_label,
    url: title.url,
    poster: title.poster,
    year: title.year || null,
    episodes_count: title.episodes_count,
    seasons_count: title.seasons_count,
    has_multiple_seasons: title.seasons_count > 1,
    genre: title.genre || null,
    description: compactDescription(title.description),
  };
}

function toSearchEntry(title) {
  const { description, genre, ...entry } = toIndexEntry(title);
  return entry;
}

async function readTitles() {
  // نقرأ أسماء الملفات كـ Buffer حتى لا تفشل أسماء الملفات العربية/غير UTF-8 بعد فك الضغط.
  const files = (await fs.readdir(titlesDir, { encoding: 'buffer' }))
    .filter((file) => file.toString().endsWith('.json'))
    .sort((a, b) => a.toString('utf8').localeCompare(b.toString('utf8'), 'ar'));

  const titles = [];
  for (const file of files) {
    const fullPath = Buffer.concat([Buffer.from(`${titlesDir}${path.sep}`), file]);
    const raw = await fs.readFile(fullPath, 'utf8');
    titles.push(sanitizeBrand(JSON.parse(raw)));
  }
  return titles;
}

async function main() {
  const titles = await readTitles();
  const stats = titles.reduce(
    (acc, title) => {
      acc.total += 1;
      acc[title.category] = (acc[title.category] || 0) + 1;
      return acc;
    },
    { total: 0, movie: 0, series: 0, anime: 0 }
  );

  await fs.mkdir(generatedDir, { recursive: true });
  await fs.writeFile(path.join(generatedDir, 'all.json'), `${JSON.stringify(titles, null, 2)}\n`, 'utf8');
  await fs.writeFile(path.join(generatedDir, 'index.json'), `${JSON.stringify(titles.map(toIndexEntry), null, 2)}\n`, 'utf8');
  await fs.writeFile(path.join(generatedDir, 'search-index.json'), `${JSON.stringify(titles.map(toSearchEntry), null, 2)}\n`, 'utf8');
  await fs.writeFile(path.join(generatedDir, 'stats.json'), `${JSON.stringify(stats, null, 2)}\n`, 'utf8');

  console.log(`Generated ${titles.length} titles.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
