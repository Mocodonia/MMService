// 1. Map initialization with zoom controls and gestures enabled
const map = L.map('map', {
    zoomControl: true,       
    scrollWheelZoom: true,  
    doubleClickZoom: true,
    touchZoom: true,
    dragging: true,
    
    // Zoom range: allow zooming out to overview (0) and in for detail (5)
    minZoom: 0,
    maxZoom: 5,
    
    // Use Simple Coordinate Reference System for flat non-geographic maps
    crs: L.CRS.Simple 
}).setView([0, 0], 2);

// 2. Custom Tile Layer (Uses negative x/y coordinates and cache-busting)
const MocodoniaTileLayer = L.TileLayer.extend({
    getTileUrl: function(coords) {
        const cacheBuster = Date.now();
        return `/MMService/metro-tiles/${coords.x},${coords.y}.png?v=${cacheBuster}`;
    }
});

// 3. Tile Layer Initialization
// The existing tiles are rendered at zoom level 2 (512x512 px).
// By fixing minNativeZoom & maxNativeZoom to 2, Leaflet properly scales
// the existing tiles up and down without requesting non-existent tile files!
new MocodoniaTileLayer({
    attribution: 'MMService Metro • Mocodonia',
    tileSize: 512,
    minZoom: 0,
    maxZoom: 5,
    minNativeZoom: 2,
    maxNativeZoom: 2,
    noWrap: true
}).addTo(map);
