// Creating map object
var myMap = L.map("map", {
  center: [39.50, -98.35],
  zoom: 4.5
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Define variables for our tile layers
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

// Only one base layer can be shown at a time
var baseMaps = {
  Light: light,
  Dark: dark
};

// Store API query variables
var baseURL = "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer/0/query?where=1%3D1&outFields=RECAREANAME,LONGITUDE,LATITUDE,RECAREAURL,OPEN_SEASON_START,OPEN_SEASON_END,FORESTNAME,RECAREAID,MARKERACTIVITY,MARKERACTIVITYGROUP,RECAREADESCRIPTION,RECPORTAL_UNIT_KEY,FORESTORGCODE,OBJECTID,FEEDESCRIPTION,OPERATIONAL_HOURS,RESERVATION_INFO,RESTRICTIONS,ACCESSIBILITY,OPENSTATUS&returnGeometry=false&outSR=4326&f=json";
var FORESTNAME = "&FORESTNAME_type=Services";
var MARKERACTIVITYGROUP = "&MARKERACTIVITYGROUP_type=Services";
var MARKERACTIVITY = "&MARKERACTIVITY_type=Services";
var OPENSTATUS = "&OPENSTATUS_type=Services"

// Assemble API query URL
var url = baseURL + FORESTNAME + MARKERACTIVITYGROUP + MARKERACTIVITY + OPENSTATUS;

// Grab the data with d3
d3.json(url, function(response) {
  console.log(response);

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < FORESTNAME.length; i++) {

    // Set the data location property to a variable
    var location = FORESTNAME[i].location;

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(response[i].descriptor));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
