function createMap(nationalForests) {

  // Create the tile layer that will be the background of our map
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the streetmap layer
  var baseMaps = {
    "Streets Map": streetmap
  };

  // Create an overlayMaps object to hold the nationalForests layer
  var overlayMaps = {
    "National Forests": nationalForests
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetmap, nationalForests]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

var attributes = response.features.attributes;

var forestMarkers = [];

for (var index = 0; index < attributes.length; index++) {
  var attribute = attributes[index];

  var forestMarker = L.marker([attributes.LATITUDE, attributes.LONGITUDE])
    .bindPopup("<h3>" + attribute.RECAREANAME + "<h3><h3>Forest Name: " + attribute.FORESTNAME + "</h3>");

    forestMarkers.push(forestMarker);
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(forestMarkers));

// Perform an API call to the National Forest API to get information. Call createMarkers when complete
d3.json ("features.json", createMarkers)
