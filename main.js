const map = L.map('map').setView([0, -1], 2); //to start at the spawn of Mocodonia

L.tileLayer('/tiles/{x},{y}.png', {
  attribution: 'MMService • Mocodonia',
  maxZoom: 20,
}).addTo(map);
