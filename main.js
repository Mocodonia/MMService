// 1. Map setup: Disable all default zoom controls
const map = L.map('map', {
    zoomControl: false,       // Removes +/- buttons
    scrollWheelZoom: false,   // Disables mouse wheel zoom
    dragging: true            // Allows basic panning
}).setView([0, -1], 2); // sets to Mocodonia cords

// 2. Custom Tile Layer: Required for negative coordinates and cache-busting
const MocodoniaTileLayer = L.TileLayer.extend({
    getTileUrl: function(coords) {
        // FINAL URL: No {z} folder, handles negative x/y, and busts the browser cache
        const cacheBuster = Date.now();
        return `/MMService/tiles/${coords.x},${coords.y}.png?v=${cacheBuster}`;
    }
});

// 3. Tile Layer Initialization: Lock the zoom range
new MocodoniaTileLayer({
    attribution: 'MMService • Mocodonia',
    tileSize: 256,
    
    // CRITICAL FIX: Lock the map to zoom level 2 (the scale of your images)
    minZoom: 2, 
    maxZoom: 2, 
    
}).addTo(map);
