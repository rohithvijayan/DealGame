/**
 * fetch-photos.mjs
 *
 * Downloads a Wikipedia portrait photo for every person in the input JSON.
 *
 * Usage:
 *   node scripts/fetch-photos.mjs [path/to/input.json]
 *
 * If no path is given it falls back to parsing src/data/defectors.ts directly.
 *
 * Input JSON must be an array of objects with at least:
 *   { "id": "url-safe-slug", "name": "Full Name" }
 *
 * Downloaded images → public/politicians/<id>.jpg
 * Summary           → scripts/fetch-photos-results.json
 */

import fs    from "node:fs";
import path  from "node:path";
import https from "node:https";
import http  from "node:http";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, "..");

// ── Config ────────────────────────────────────────────────────────────────
const OUT_DIR      = path.join(ROOT, "public", "politicians");
const RESULTS_FILE = path.join(__dirname, "fetch-photos-results.json");
const BASE_DELAY   = 500;    // ms between requests (polite crawl)
const IMAGE_SIZE   = 400;    // px width requested from Wikipedia
const MAX_RETRIES  = 4;      // retry attempts for 429 / network errors

// ── Helpers ───────────────────────────────────────────────────────────────

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchJson(url, attempt = 0) {
  const res = await fetch(url, {
    headers: { "User-Agent": "DealGame-PhotoFetcher/1.0 (educational project)" }
  });
  if (res.status === 429) {
    if (attempt >= MAX_RETRIES) throw new Error("HTTP 429 — rate limited after retries");
    const wait = BASE_DELAY * 2 ** (attempt + 2);   // 2s, 4s, 8s, 16s
    await sleep(wait);
    return fetchJson(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

function downloadFile(url, destPath, attempt = 0) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith("https") ? https : http;
    const file  = fs.createWriteStream(destPath);

    const req = proto.get(url, {
      headers: { "User-Agent": "DealGame-PhotoFetcher/1.0" }
    }, async (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close(); fs.unlinkSync(destPath);
        return downloadFile(res.headers.location, destPath, attempt).then(resolve).catch(reject);
      }
      if (res.statusCode === 429) {
        file.close(); fs.unlinkSync(destPath);
        if (attempt >= MAX_RETRIES) return reject(new Error("HTTP 429 — rate limited after retries"));
        const wait = BASE_DELAY * 2 ** (attempt + 2);
        await sleep(wait);
        return downloadFile(url, destPath, attempt + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close(); fs.unlinkSync(destPath);
        return reject(new Error(`HTTP ${res.statusCode} downloading image`));
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
      file.on("error", err => { fs.unlinkSync(destPath); reject(err); });
    });

    req.on("error", err => { file.close(); reject(err); });
    req.setTimeout(20_000, () => { req.destroy(); reject(new Error("Timeout")); });
  });
}

/**
 * Check whether an article title is a plausible match for the searched name.
 * Rules:
 *  – At least one token from the query must appear in the title (case-insensitive).
 *  – Allow for common abbreviations: "Capt." → "Captain", initials like "R.P.N."
 */
function isTitleRelevant(searchName, articleTitle) {
  const normalize = s => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  const nTitle = normalize(articleTitle);
  const tokens = normalize(searchName).split(" ").filter(t => t.length > 2);
  // For short names (1-2 tokens) require ALL tokens to match;
  // for longer names (3+) require at least ⌈n/2⌉ — handles "Capt. X Y" style.
  const matches = tokens.filter(t => nTitle.includes(t));
  const required = tokens.length <= 2 ? tokens.length : Math.ceil(tokens.length / 2);
  return matches.length >= required;
}

/**
 * Search Wikipedia for `name` (with Indian-politician context) and return
 * the thumbnail image URL + article title. Returns null if nothing useful found.
 */
async function getWikipediaImageUrl(name) {
  // Build a few search variants, from most to least specific
  const queries = [
    `${name} Indian politician`,
    `${name} politician India`,
    name,
  ];

  for (const query of queries) {
    const searchUrl = new URL("https://en.wikipedia.org/w/api.php");
    searchUrl.searchParams.set("action", "opensearch");
    searchUrl.searchParams.set("search", query);
    searchUrl.searchParams.set("limit",  "5");
    searchUrl.searchParams.set("format", "json");

    const searchData = await fetchJson(searchUrl.toString());
    const titles = searchData[1];
    if (!titles || titles.length === 0) continue;

    // Filter to plausibly matching titles
    const candidates = titles.filter(t => isTitleRelevant(name, t));
    if (candidates.length === 0) continue;

    for (const title of candidates) {
      const imgUrl = new URL("https://en.wikipedia.org/w/api.php");
      imgUrl.searchParams.set("action",      "query");
      imgUrl.searchParams.set("titles",      title);
      imgUrl.searchParams.set("prop",        "pageimages");
      imgUrl.searchParams.set("pithumbsize", String(IMAGE_SIZE));
      imgUrl.searchParams.set("format",      "json");

      const imgData = await fetchJson(imgUrl.toString());
      const pages   = Object.values(imgData.query.pages);
      const page    = pages[0];

      if (page?.thumbnail?.source) {
        return { imageUrl: page.thumbnail.source, articleTitle: title };
      }
    }
  }

  return null;
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const inputArg = process.argv[2];
  let people = [];

  if (inputArg) {
    const inputPath = path.resolve(process.cwd(), inputArg);
    if (!fs.existsSync(inputPath)) {
      console.error(`❌  Input file not found: ${inputPath}`); process.exit(1);
    }
    people = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  } else {
    // Parse defectors.ts with regex (no ts-node needed)
    const src = fs.readFileSync(path.join(ROOT, "src", "data", "defectors.ts"), "utf8");
    const matches = [...src.matchAll(/id:\s*"([^"]+)"[^}]*?name:\s*"([^"]+)"/gs)];
    people = matches.map(([, id, name]) => ({ id, name }));
    if (people.length === 0) {
      console.error("❌  Could not parse defectors.ts — pass a JSON file explicitly."); process.exit(1);
    }
    console.log(`ℹ  No JSON file given — using ${people.length} entries from defectors.ts\n`);
  }

  if (!Array.isArray(people) || people.length === 0) {
    console.error("❌  Input must be a non-empty array."); process.exit(1);
  }

  const bad = people.filter(p => !p.id || !p.name);
  if (bad.length) {
    console.error(`❌  ${bad.length} entries missing "id" or "name":`, bad.slice(0, 3)); process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Load previous results so we can skip entries that already succeeded
  let prevResults = {};
  if (fs.existsSync(RESULTS_FILE)) {
    try {
      const prev = JSON.parse(fs.readFileSync(RESULTS_FILE, "utf8"));
      prevResults = Object.fromEntries(prev.map(r => [r.id, r]));
    } catch { /* ignore */ }
  }

  const results = [];
  let downloaded = 0, skipped = 0, failed = 0;

  console.log(`\n📥  Fetching photos for ${people.length} people → ${OUT_DIR}\n`);

  for (let i = 0; i < people.length; i++) {
    const { id, name } = people[i];
    const destPath = path.join(OUT_DIR, `${id}.jpg`);
    const label    = `[${String(i + 1).padStart(2)}/${people.length}] ${name}`;

    // Skip if file already on disk
    if (fs.existsSync(destPath)) {
      console.log(`  ⏭   ${label} — already exists`);
      results.push({ id, name, status: "skipped", path: destPath });
      skipped++;
      continue;
    }

    try {
      process.stdout.write(`  🔍  ${label} … `);

      const found = await getWikipediaImageUrl(name);

      if (!found) {
        console.log("no image found");
        results.push({ id, name, status: "not_found" });
        failed++;
        await sleep(BASE_DELAY);
        continue;
      }

      await downloadFile(found.imageUrl, destPath);
      console.log(`✅  saved  (${found.articleTitle})`);
      results.push({ id, name, status: "ok", path: destPath, article: found.articleTitle, src: found.imageUrl });
      downloaded++;
    } catch (err) {
      console.log(`❌  ${err.message}`);
      results.push({ id, name, status: "error", error: err.message });
      failed++;
    }

    await sleep(BASE_DELAY);
  }

  // Merge with previous results (preserve earlier successes not re-run)
  const merged = people.map(p => {
    const cur  = results.find(r => r.id === p.id);
    const prev = prevResults[p.id];
    if (cur)  return cur;
    if (prev) return prev;
    return { id: p.id, name: p.name, status: "not_run" };
  });

  fs.writeFileSync(RESULTS_FILE, JSON.stringify(merged, null, 2));

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅  Downloaded : ${downloaded}
  ⏭   Skipped   : ${skipped}
  ❌  Failed     : ${failed}
  📄  Results   : ${RESULTS_FILE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

  if (failed > 0) {
    console.log("Failed / not found:");
    results
      .filter(r => r.status === "error" || r.status === "not_found")
      .forEach(r => console.log(`  • ${r.name} — ${r.status}${r.error ? ": " + r.error : ""}`));
  }
}

main().catch(err => { console.error(err); process.exit(1); });
