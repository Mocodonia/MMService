const map = L.map('map').setView([0, -1], 2); //to start at the spawn of Mocodonia

L.tileLayer('', {
  tileSize: 256,
  maxZoom: 20,
  attribution: 'MMService • Mocodonia',
  getTileUrl: function(coords) {
    return `/MMService/tiles/${coords.x},${coords.y}.png`;
  }
}).addTo(map);
