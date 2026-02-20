import fs from "node:fs";
import path from "node:path";

const tilesDir = path.resolve("tiles");
const outFile = path.join(tilesDir, "index.json");

if (!fs.existsSync(tilesDir)) {
  console.error(`Tiles directory not found: ${tilesDir}`);
  process.exit(1);
}

const files = fs.readdirSync(tilesDir);
const pngs = files.filter((f) => f.toLowerCase().endsWith(".png"));

let minX = Infinity,
  maxX = -Infinity,
  minY = Infinity,
  maxY = -Infinity;

const re = /^(-?\d+),(-?\d+)\.png$/;

for (const f of pngs) {
  const m = f.match(re);
  if (!m) continue;
  const x = Number(m[1]);
  const y = Number(m[2]);

  if (x < minX) minX = x;
  if (x > maxX) maxX = x;
  if (y < minY) minY = y;
  if (y > maxY) maxY = y;
}

if (!Number.isFinite(minX)) {
  console.error(`No tiles matched /-?\\d+,-?\\d+\\.png/ in ${tilesDir}`);
  process.exit(1);
}

// Tile size is fixed in your case, but keep it explicit:
const tileSize = 512;

// Use the commit SHA as a version string for cache busting
const version = process.env.GITHUB_SHA ?? "dev";

const data = {
  tileSize,
  minX,
  maxX,
  minY,
  maxY,
  version,
};

fs.writeFileSync(outFile, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`Wrote ${outFile}:`, data);
