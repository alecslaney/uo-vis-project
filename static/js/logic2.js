var map = L.map("map-id", {
  center: [40.62, -121.39],
  zoom: 12,
  layers: [forestMarkers]
});
​
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
}).addTo(map);
​
function createMap(nationalForests) {
​
  // Create the tile layer that will be the background of our map
  
​
  // Create a baseMaps object to hold the streetmap layer
  var baseMaps = {
    "Streets Map": streetmap
  };
​
  // Create an overlayMaps object to hold the nationalForests layer
  var overlayMaps = {
    "National Forests": nationalForests
  };
​
  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}
​
function createMarkers(response) {
​
  // console.log(response);
​
  var forestMarkers = [];
​
  Object.entries(response).forEach(function(feature){
    // console.log(feature[1]);
    // console.log("======================================================")
    // console.log(" Going to next feature.")
​
    iconObj = {
​
    }
    L.marker([feature[1].LATITUDE, feature[1].LONGITUDE],{
      icon: {
        iconUrl: '',
        iconSize: [40, 40],
        className: "pin-class"
      }
    })
    .addTo(map)
    .bindPopup("<h3>" + feature[1].RECAREANAME + "<h3><h3>Forest Name: " + feature[1].FORESTNAME + "</h3>");
​
    var forestmarker = L.marker([feature[1].LATITUDE, feature[1].LONGITUDE],{
      icon: {
        iconUrl: '',
        iconSize: [40, 40],
        className: "pin-class"
      }
    })
​
    forestmarker.addTo(map)
​
    forestmarker.bindPopup.bindPopup("<h3>" + feature[1].RECAREANAME + "<h3><h3>Forest Name: " + feature[1].FORESTNAME + "</h3>");
​
      forestMarkers.push(forestMarker);
  });
​
  // var attributes = response.features.attributes;
​
  
​
  // for (var index = 0; index < attributes.length; index++) {
  //   var attribute = attributes[index];
​
    
​
    // Create a layer group made from the array, pass it into the createMap function
    L.layerGroup(forestMarkers).addLayer;
}
​
// Perform call to the National Forest data to get information. Call createMarkers when complete
d3.json("flask/jsons/features.json", createMarkers);
​
​
​
​
​
​
​
​
function createForestMarkersPlease(forestMarkers){// Create the map object with options
var map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12,
  layers: [forestMarkers]
});
​
var overlays = {
  "Forests" : forestmarkers
}
​
​
L.control.Layers(baseMaps, overlays,. {
  collapsed = false
}).addto(map)
​
