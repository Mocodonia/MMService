//declare the constant
const map = L.map('map').setView([0, 0], 2); //Set view to center for now

//1. FIX: Define the tile layer using the URL string with standard Leaflet placeholders {x}, {y}, {z}
const mocodoniaTilesURL = '/MMService/tiles/{z}/{x},{y}.png'; //this will now include Z so that zoom will be set

//2. FIX: Use the standard L.tileLayer factory method
L.tileLayer(mocodoniaTilesURL, {
  attribution: 'MMService • Mocodonia',
  tileSize: 256,
  maxZoom: 20,
}).addTo(map);
