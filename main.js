const map = L.map('map').setView([0, 0], 2); // Placeholder coords

L.tileLayer('/tiles/{z}/{x}/{y}.png', {
  attribution: 'MMService • Mocodonia',
  maxZoom: 18,
}).addTo(map);
