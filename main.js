const map = L.map('map').setView([0, -1], 2); // Mocodonia spawn

L.GridLayer.TileLayer = L.GridLayer.extend({
  getTileUrl: function(coords) {
    return `/MMService/tiles/${coords.x},${coords.y}.png`;
  }
});

new L.GridLayer.TileLayer({
  attribution: 'MMService • Mocodonia',
  tileSize: 256,
  maxZoom: 20,
}).addTo(map);
