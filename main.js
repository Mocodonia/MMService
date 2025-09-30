// declare the constant
// Keep the map view set to the zoom level of your tiles
const map = L.map('map').setView([0, -1], 2);

// Define the custom tile layer
const MocodoniaTileLayer = L.TileLayer.extend({
    getTileUrl: function(coords) {
        // FIX: Removed the ${coords.z} part.
        // The URL now correctly handles the negative coordinates without a zoom folder.
        return `/MMService/tiles/${coords.x},${coords.y}.png`;
    }
});

// define the map tiles to the map
new MocodoniaTileLayer({
    attribution: 'MMService • Mocodonia',
    tileSize: 256,
    
    // CRITICAL FIX: Lock the zoom range to the level of your tiles.
    // This prevents Leaflet from requesting Z=1 or Z=3 tiles, which don't exist.
    minZoom: 2,
    maxZoom: 2, 
    
    // Optional: Disallow the user from zooming with the scroll wheel
    // scrollWheelZoom: false 
}).addTo(map);
