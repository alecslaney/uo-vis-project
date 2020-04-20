function createMap(nationalForests) {
  ​
    // Create the tile layer that will be the background of our map
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY
    });
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
    // Create the map object with options (Lassen National Park, CA)
    var map = L.map("map-id", {
      center: [40.62, -121.39],
      zoom: 12,
      layers: [streetmap, nationalForests]
    });
  ​
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  ​
  function createMarkers(response) {
  ​
    var attributes = [];
  ​
    Object.entries(response).forEach(function(data) {
      attributes.push(data[1]);
    });
  ​
    var forestMarkers = [];
  ​
    for (var index = 0; index < attributes.length; index++) {
      var attribute = attributes[index];
  ​
      console.log(`Latitude is:`);
      console.log(attribute.LATITUDE)
      console.log(typeof attribute.LATITUDE)
      console.log(typeof Number(attribute.LATITUDE))
  ​
      var forestMarker = L.marker([Number(attributes.LATITUDE), Number(attributes.LONGITUDE)])
        .bindPopup("<h3>" + attribute.RECAREANAME + "<h3><h3>Forest Name: " + attribute.FORESTNAME + "</h3>");
  ​
        forestMarkers.push(forestMarker);
    }
  ​
    // Create a layer group made from the array, pass it into the createMap function
    createMap(L.layerGroup(forestMarkers));
  }
  ​
  // Perform call to the National Forest data to get information. Call createMarkers when complete
  d3.json ("flask/jsons/features.json", createMarkers);