// Leaflet "single-zoom tile set" setup:
// - You only have tiles for BASE_ZOOM
// - When user zooms, we keep serving BASE_ZOOM tiles and let Leaflet scale them.

const BASE_ZOOM = 2;

// 1) Map init (enable zoom)
const map = L.map('map', {
  zoomControl: true,
  scrollWheelZoom: true,
  doubleClickZoom: true,
  dragging: true,

  // flat image / game-map style coords
  crs: L.CRS.Simple,

  // smoother zoom steps (optional)
  zoomSnap: 0.25,
  zoomDelta: 0.25,

  // optional: can reduce visual weirdness on some setups
  // zoomAnimation: false,
}).setView([0, 0], BASE_ZOOM);

// 2) Custom TileLayer that ALWAYS serves BASE_ZOOM tiles
const MocodoniaTileLayer = L.TileLayer.extend({
  getTileUrl: function (coords) {
    const cacheBuster = Date.now();
    const dz = coords.z - BASE_ZOOM;

    let x, y;

    if (dz === 0) {
      // normal: requested zoom matches our tile set
      x = coords.x;
      y = coords.y;
    } else if (dz > 0) {
      // zoomed IN: many requested tiles map to one base tile
      const scale = Math.pow(2, dz);
      x = Math.floor(coords.x / scale);
      y = Math.floor(coords.y / scale);
    } else {
      // zoomed OUT: one requested tile covers multiple base tiles.
      // We pick the "top-left" base tile (will look repetitive/blocky).
      const scale = Math.pow(2, -dz);
      x = coords.x * scale;
      y = coords.y * scale;
    }

    return `/MMService/tiles/${x},${y}.png?v=${cacheBuster}`;
  }
});

// 3) Add the layer
new MocodoniaTileLayer({
  attribution: 'MMService • Mocodonia',
  tileSize: 256,

  // If zooming OUT below BASE_ZOOM looks bad, set minZoom: BASE_ZOOM instead.
  minZoom: 0,
  maxZoom: 6,

  // optional for CRS.Simple so the world doesn't repeat
  noWrap: true,

  // optional: keeps panning from duplicating tiles outside the "world"
  // bounds: L.latLngBounds([minY, minX], [maxY, maxX]),
}).addTo(map);
