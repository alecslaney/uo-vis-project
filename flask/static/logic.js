// // Creating map object
// var myMap = L.map("map", {
//   center: [39.50, -98.35],
//   zoom: 4.5
// });

// // Adding tile layer to the map
// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.streets",
//   accessToken: API_KEY
// }).addTo(myMap);



// Define variables for our tile layers
var lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
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
  "Dark": darkMap,
  "Satellite Map" : satelliteMap,
  "Street Map" : streetMap
};

// // Creating map object
// var myMap = L.map("map", {
//   center: [39.50, -98.35],
//   zoom: 4,
//   layers: [lightMap,darkMap,streetMap,satelliteMap]
// });

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

// // Only one base layer can be shown at a time
// var baseMaps = {
//   Light: light,
//   Dark: dark
// };

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
  //console.log(response);

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  var cabinMarkers = [];
  var campMarkers = [];
  var waterMarkers = [];
  var trailMarkers = [];
  var winterMarkers = [];


  var cabinCampCount = 0;
  var cabinCount = 0;
  var campCount = 0;
  var waterCount = 0;
  var trailCount = 0;
  var winterCount = 0;

  // Loop through data
  for (var i = 0; i < response.length; i++) {
    //console.log(response[i]);
    // Set the data location property to a variable
    // var location = response[i].location;

    // Check for location property
    // if (location) {

      if(response[i].activity_group === "Camping and Cabins"){
        cabinCount++;
        var cabinMarker = L.marker([response[i].lat, response[i].long],{
          icon : L.icon({
            iconUrl : '../static/images/cabin.png',
            iconSize: [20, 20],
            className: "cabin-mark-class"
          })
        })
        .bindPopup(response[i].descr);
  
        cabinMarkers.push(cabinMarker);
      }

      if(response[i].activity_group === "Camping and Cabins"){
        campingCount++;
        var campMarker = L.marker([response[i].lat, response[i].long],{
          icon : L.icon({
            iconUrl : '../static/images/campground.png', 
            iconSize: [20, 20],
            className: "camp-mark-class"
          })
        })
        .bindPopup(response[i].descr);
  
        campMarkers.push(campMarker);
      }

      if(response[i].activity_group === "Water Activities"){
        waterCount++;
        var waterMarker = L.marker([response[i].lat, response[i].long],{
          icon : L.icon({
            iconUrl : '../static/images/water.png',
            iconSize: [20, 20],
            className: "wat-mark-class"
          })
        })
        .bindPopup(response[i].descr);
  
        waterMarkers.push(waterMarker);
      }

      if(response[i].activity_group === "Trailhead"){
        trailCount++;
        var trailMarker = L.marker([response[i].lat, response[i].long],{
          icon : L.icon({
            iconUrl : '../static/images/hiker.png',
            iconSize: [20, 20],
            className: "trail-mark-class"
          })
        })
        .bindPopup(response[i].descr);
  
        trailMarkers.push(trailMarker);
      }

      if(response[i].activity_group === "Winter Sports"){
        winterCount++;
        var winterMarker = L.marker([response[i].lat, response[i].long],{
          icon : L.icon({
            iconUrl : '../static/images/mountain.png',
            iconSize: [20, 20],
            className: "winter-mark-class"
          })
        })
        .bindPopup(response[i].descr);
  
        winterMarkers.push(winterMarker);
      }

      if(response[i].activity === "Campground Camping"){
        campCount++;
  
        var campMarker = L.marker([response[i].lat, response[i].long],{
          icon : L.icon({
            iconUrl : '../static/images/campground.png',
            iconSize: [20,20],
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
            iconUrl : '../static/images/cabin.png',
            iconSize: [20,20], 
            className: "cabin-mark-class"
          })
        })
        .bindPopup(response[i].descr);
  
        cabinMarkers.push(cabinMarker);
      }
      // if(response[i].activity === "Trailhead"){
      //   trailCount++;
  
      //   var trailMarker = L.marker([response[i].lat, response[i].long])
      //   .bindPopup(response[i].descr);
  
      //   trailMarkers.push(trailMarker);
      // }

      //Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([response[i].lat, response[i].long])
          .bindPopup(response[i].descr));
        }
      
      // markers.addLayer(L.marker([response[i].lat, response[i].long])
      //     .bindPopup(response[i].descr));
      //   })

  // console.log("WHats the count of each?");
  // console.log(campCount);
  // console.log(cabinCount);
  // console.log(cabinCampCount);
  // console.log(waterCount);
  // console.log(trailCount);
  // console.log(winterCount);

  //Creating map object
var myMap = L.map("map", {
  center: [39.50, -98.35],
  zoom: 4,
  layers: [streetMap, markers]
});

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);
  myMap.addLayer(L.layerGroup(cabinMarkers));
  myMap.addLayer(L.layerGroup(campMarkers));
  myMap.addLayer(L.layerGroup(waterMarkers));
  myMap.addLayer(L.layerGroup(trailMarkers));
  myMap.addLayer(L.layerGroup(winterMarkers));

  overlayMaps = {
    "Camping" : L.layerGroup(campMarkers),
    "Cabins": L.layerGroup(cabinMarkers),
    "Trailhead" : L.layerGroup(trailMarkers), 
    "Water Sports" : L.layerGroup(waterMarkers),
    "Winter Sports" : L.layerGroup(winterMarkers),
    "All Activities" : markers
  } 
  
  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed : false
  }).addTo(myMap);
  // L.control.layers(baseMaps, overlayMaps2, {
  //   collapsed : false
  // }).addTo(myMap);

  })