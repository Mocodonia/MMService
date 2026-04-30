// 1. Map initialization
const map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    touchZoom: true,
    dragging: true,

    // Use the Simple Coordinate Reference System for flat, non-geographic maps
    crs: L.CRS.Simple
}).setView([0, 0], 2);

// 2. Pinned-zoom tile layer:
// Always request the SAME x,y tiles regardless of current zoom (z is ignored).
const PinnedZoomTiles = L.GridLayer.extend({
    createTile: function (coords, done) {
        const tile = document.createElement('img');
        tile.width = 256;
        tile.height = 256;
        tile.alt = '';

        const cacheBuster = Date.now();
        tile.src = `/MMService/tiles/${coords.x},${coords.y}.png?v=${cacheBuster}`;

        tile.onload = () => done(null, tile);
        tile.onerror = () => done(null, tile);
        return tile;
    }
});

// 3. Layer init (allow zoom 0–8, but it only scales the same tiles)
new PinnedZoomTiles({
    attribution: 'MMService • Mocodonia',
    tileSize: 256,
    minZoom: 0,
    maxZoom: 8
}).addTo(map);
