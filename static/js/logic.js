// Define variables for our tile layers
var lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var sateliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

var streetMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

// // Only one base layer can be shown at a time
var baseMaps = {
  "Light": lightMap,
  "Satelite Map" : sateliteMap,
  "Street Map" : streetMap
};

// Creating map object
var myMap = L.map("map", {
  center: [39.50, -98.35],
  zoom: 4,
  layers: [lightMap,streetMap,sateliteMap]
});

// Adding tile layer to the map


// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(myMap);



var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});





// Store API query variables
// var baseURL = "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer/0/query?where=1%3D1&outFields=RECAREANAME,LONGITUDE,LATITUDE,RECAREAURL,OPEN_SEASON_START,OPEN_SEASON_END,FORESTNAME,RECAREAID,MARKERACTIVITY,MARKERACTIVITYGROUP,RECAREADESCRIPTION,RECPORTAL_UNIT_KEY,FORESTORGCODE,OBJECTID,FEEDESCRIPTION,OPERATIONAL_HOURS,RESERVATION_INFO,RESTRICTIONS,ACCESSIBILITY,OPENSTATUS&returnGeometry=false&outSR=4326&f=json";
// var FORESTNAME = "&FORESTNAME_type=Services";
// var MARKERACTIVITYGROUP = "&MARKERACTIVITYGROUP_type=Services";
// var MARKERACTIVITY = "&MARKERACTIVITY_type=Services";
// var OPENSTATUS = "&OPENSTATUS_type=Services"

// Assemble API query URL
// var url = baseURL + FORESTNAME + MARKERACTIVITYGROUP + MARKERACTIVITY + OPENSTATUS;
var url = "http://localhost:5000/api"

// Grab the data with d3
// url = http://localhost:5000/api <-- flask app
// url = http://localhost:5000/api

d3.json(url, function(response) {
  console.log(response);

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  var cabinMarkers = [];
  var campMarkers = [];
  var waterMarkers = [];

  var cabinCampCount = 0;
  var cabinCount = 0;
  var campCount = 0;
  var waterCount = 0;
  

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    

    // Set the data location property to a variable
    // var location = response[i].location;

    // Check for location property
    // if (location) {
    //if(response[i].activity_group === "Camping & Cabins"){
      //cabinCampCount++;
      //var cabinMarker = L.marker([response[i].lat, response[i].long])
      //.bindPopup(response[i].descr);

      // cabinMarkers.push(cabinMarker);
    //}
    if(response[i].activity_group === "Water Activities"){
      waterCount++;
      var waterMarker = L.marker([response[i].lat, response[i].long],{
        icon : L.icon({
          iconUrl : 'images/water.png',
          iconSize: [20, 20],
          className: "wat-mark-class"
        })
      })
      .bindPopup(response[i].descr);

      waterMarkers.push(waterMarker);
    }
    if(response[i].activity === "Campground Camping"){
      campCount++;

      var campMarker = L.marker([response[i].lat, response[i].long],{
      icon : L.icon({
        iconUrl : 'images/ForestMarker.png',
        iconSize: [20, 20],
        className: "camp-mark-class"
      })
    })
      .bindPopup(response[i].descr);

      campMarkers.push(campMarker);
    }
    if(response[i].activity === "Cabin Rentals"){
      cabinCount++;

      var cabinMarker = L.marker([response[i].lat, response[i].long],{
      icon : L.icon({
        iconUrl : 'images/cabin.png',
        iconSize: [20, 20],
        className: "cabin-mark-class"
      })
    })
      .bindPopup(response[i].descr);

      cabinMarkers.push(cabinMarker);
    }


      // Add a new marker to the cluster group and bind a pop-up
      // markers.addLayer(L.marker([response[i].lat, response[i].long])
      //   .bindPopup(response[i].descr));
    // }

    markers.addLayer(L.marker([response[i].lat, response[i].long])
        .bindPopup(response[i].descr));
  }

  console.log("WHats the breakdown??????");
  console.log(campCount);
  console.log(cabinCount);
  console.log(cabinCampCount);
  console.log(waterCount);

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);
  myMap.addLayer(L.layerGroup(cabinMarkers));
  myMap.addLayer(L.layerGroup(campMarkers));
  myMap.addLayer(L.layerGroup(waterMarkers));

  overlayMaps = {
    "Cabins": L.layerGroup(cabinMarkers),
    "Water Funs" : L.layerGroup(waterMarkers),
    "Camps" : L.layerGroup(campMarkers),
    "Cluster Group" : markers
  };

 


  // Add controls here
  L.control.layers(baseMaps, overlayMaps, {
    collapsed : false
  }).addTo(myMap);
  // L.control.layers(baseMaps, overlayMaps2).addTo(myMap);

});