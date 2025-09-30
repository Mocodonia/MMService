//declare the constant
const map = L.map('map').setView([0, -1], 2); //the cords for Mocodonia spawn

//define the tile layer
L.TileLayer.MocodoniaTiles = L.TileLayer.extend({
  getTileUrl: function(coords) {
    return `/MMService/tiles/${coords.x},${coords.y}.png`;
  }
});

//define the map tiles to the map
new L.TileLayer.MocodoniaTiles({
  attribution: 'MMService • Mocodonia',
  tileSize: 256,
  maxZoom: 20,
}).addTo(map);
