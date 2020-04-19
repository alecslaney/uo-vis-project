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

function createMarkers(ForestMarkers) {


var ForestMarkers = [
  //"id", "rec_area_name", "forest_name","lat","long","activity_group","activity","status",
  //"hours","res_info","fees","restrictions","accessib","url",
  //"descr","open_season_start","open_season_end","rec_area_id","recportal_unit_key","forest_org_code"
]
// Initialize an array to hold Forest Markers
var forestMarkers = [];

// Loop through the array
for (var i = 0; i < ForestMarkers.length; i++) {
 
  // For each id, create a marker and bind a popup with the id's name  
  var forestMarker = L.marker([lat, long])
    .bindPopup("<h3>" + activity_group + "<h3><h3>Forest Name: " + forest_name + "</h3>");
  
  // Add the marker to the forestMarkers array
    forestMarkers.push(forestMarker);
  }

  // Create a layer group made from the forest markers array, pass it into the createMap function
  createMap(L.layerGroup(forestMarkers));

// Perform an API...json...csv call to the National Forest API to get information. Call createMarkers when complete
d3.csv ("data_clean.csv", createMarkers);
}
