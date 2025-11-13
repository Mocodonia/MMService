// 1. CRITICAL FIX: Add the CRS option to the map initialization
const map = L.map('map', {
    zoomControl: false,       
    scrollWheelZoom: false,  
    doubleClickZoom: false, //this disables the double tap to zoom
    dragging: true,
    
    // Use the Simple Coordinate Reference System for flat, non-geographic maps
    crs: L.CRS.Simple 
    
}).setView([0, 0], 2); // Set view center to 0,0 for easier debugging

// 2. Custom Tile Layer (Remains necessary for negative coordinates and cache-busting)
const MocodoniaTileLayer = L.TileLayer.extend({
    getTileUrl: function(coords) {
        // Final URL: Correctly uses negative x/y from the Simple CRS
        const cacheBuster = Date.now();
        return `/MMService/tiles/${coords.x},${coords.y}.png?v=${cacheBuster}`;
    }
});

// 3. Tile Layer Initialization (Lock the zoom and use the custom class)
new MocodoniaTileLayer({
    attribution: 'MMService • Mocodonia',
    tileSize: 256,
    
    // Lock the map to zoom level 2 (the scale of your images)
    minZoom: 2, 
    maxZoom: 2, 
    
}).addTo(map);

//search functions chaos starts here
function goToCoordinates() {
  const input = document.getElementById('coord-search').value.trim();
  const match = input.match(/^(-?\d+),\s*(-?\d+)$/);

  if (!match) {
    alert("Please enter coordinates in the format: x,y (e.g. 0,-1)");
    return;
  }

  const x = parseInt(match[1], 10);
  const y = parseInt(match[2], 10);

  // Leaflet CRS.Simple treats coordinates as pixels, so we need to scale them
  const tileSize = 256;
  const scaledX = x * tileSize + tileSize / 2;
  const scaledY = y * tileSize + tileSize / 2;

  // Set view using [y, x] order
  map.setView([scaledY, scaledX], 2);
}


//use enter for searches
document.getElementById('coord-search').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') goToCoordinates();
});

