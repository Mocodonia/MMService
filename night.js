async function init() {
  // Reuse the same index file that’s generated from your day tiles,
  // because day/night should share the same bounds + tile size.
  // If your night tiles ever have different bounds, create night-tiles/index.json instead.
  const indexUrl = "tiles/index.json";
  const res = await fetch(indexUrl, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to load ${indexUrl}: ${res.status} ${res.statusText}`);
  }

  const idx = await res.json();

  const TILE_SIZE = Number(idx.tileSize ?? 512);
  const minX = Number(idx.minX);
  const maxX = Number(idx.maxX);
  const minY = Number(idx.minY);
  const maxY = Number(idx.maxY);
  const version = String(idx.version ?? "1");

  if (
    !Number.isFinite(TILE_SIZE) ||
    !Number.isFinite(minX) || !Number.isFinite(maxX) ||
    !Number.isFinite(minY) || !Number.isFinite(maxY)
  ) {
    throw new Error(`Invalid tiles/index.json contents: ${JSON.stringify(idx)}`);
  }

  // Pixel bounds for CRS.Simple
  const pixelBounds = [
    [minY * TILE_SIZE, minX * TILE_SIZE],
    [(maxY + 1) * TILE_SIZE, (maxX + 1) * TILE_SIZE],
  ];

  // 1) Map init (flat coordinate system)
  const map = L.map("map", {
    crs: L.CRS.Simple,

    zoomControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    dragging: true,

    worldCopyJump: false,

    // Clamp panning to your tile rectangle
    maxBounds: pixelBounds,
    maxBoundsViscosity: 1.0,
  });

  map.fitBounds(pixelBounds);

  // 2) Custom tile layer for NIGHT tiles:
  // Always request native tiles; Leaflet scales them to simulate zoom.
  const MocodoniaNightTileLayer = L.TileLayer.extend({
    getTileUrl: function (coords) {
      const scale = Math.pow(2, coords.z);
      const x = Math.floor(coords.x / scale);
      const y = Math.floor(coords.y / scale);

      return `night-tiles/${x},${y}.png?v=${encodeURIComponent(version)}`;
    },
  });

  // 3) Tile layer initialization
  new MocodoniaNightTileLayer("", {
    attribution: "MMService Night Mode • Mocodonia",

    tileSize: TILE_SIZE,
    noWrap: true,
    bounds: pixelBounds,
    keepBuffer: 6,

    // "Fake zoom" range (tune to taste)
    minZoom: -3,
    maxZoom: 3,
    zoomSnap: 0.25,
    zoomDelta: 0.25,

    // We only have one native zoom level worth of tiles
    minNativeZoom: 0,
    maxNativeZoom: 0,
  }).addTo(map);
}

init().catch((err) => {
  console.error(err);
});
