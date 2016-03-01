/* =====================
  Map Setup
===================== */

var map = L.map('map', {
  center: [39.917324, 116.397330],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
  Grab the data, parse it, and show data on the map
===================== */
var dataset = 'https://raw.githubusercontent.com/zhaoluyun/datasets/master/geojson/housingprice_Beijing.geojson';




var layer1 = [];
var layer2 = [];
var layer3 = [];
var layer4 = [];
var layer5 = [];




setslideOne = function() {
  $('#heading').text('Spatial Distribution of Housing Price');
  $('#text').text('Price tends to be higher as closer to the center.');
  $('#text2').text('Click to see the price of the property.');
  $('#result').text("");
  map.removeLayer(layer2);
  var myStyle = function(feature) {
    if (feature.properties.priceperm2 <= 20000) {
      return {fillColor: '#f3ecbc'};
    }
    else if (feature.properties.priceperm2 >20000 & feature.properties.priceperm2<= 30000) {
      return {fillColor: '#f4b657'};
    }
    else if (feature.properties.priceperm2 >30000 & feature.properties.priceperm2<= 40000) {
      return {fillColor: '#f1625d'};
    }
    else if (feature.properties.priceperm2 >40000 & feature.properties.priceperm2<= 50000) {
      return {fillColor: '#8dbeb1'};
    }
    else {
      return {fillColor: '#5d4c52'};
    }
  }; //for different price level, give different color.
  var geojsonMarkerOptions = {
    radius: 8,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
};
  var eachFeature = function(feature, layer) {
    layer.on('click', function (e) {
    $('#result').text("The price of this property is: " + feature.properties.priceperm2 +' (RMB/square meter)');
    });
  };
  var myFilter = function(feature) {
    if (feature.properties.priceperm2 !== "") {
    return true;
    }
  };
  $(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      layer1= L.geoJson(parsedData, {
          onEachFeature: eachFeature,
          filter: myFilter,
          style: myStyle,
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          }
      }).addTo(map);
    });

  });
  $('#button_next').off();
  $('#button_next').click(function(){setslideTwo();});
  $('#legend1').show();
  $('#legend2').hide();
  $('#legend4').hide();
  $('#legend5').hide();
  $('#button_previous').hide();
};

setslideOne();


setslideTwo = function() {
  $('#heading').text('Floor of Buildings');
  $('#text').text('Floor of housing is shown with colors that represent different floor level. There are many high rise buildings in Beijing.');
  $('#text2').text('Click to see the floor of certain property');
  $('#result').text("");
        map.removeLayer(layer1);
        map.removeLayer(layer3);
  var myStyle = function(feature) {
    if (feature.properties.floor <= 3) {
      return {fillColor: '#f3ecbc'};
    }
    else if (feature.properties.floor >3 & feature.properties.floor<= 6) {
      return {fillColor: '#f4b657'};
    }
    else if (feature.properties.floor >6 & feature.properties.floor<= 10) {
      return {fillColor: '#f1625d'};
    }
    else if (feature.properties.floor >10 & feature.properties.floor<= 20) {
      return {fillColor: '#8dbeb1'};
    }
    else {
      return {fillColor: '#5d4c52'};
    }
  }; //for different floor level, give different color.
  var geojsonMarkerOptions = {
    radius: 8,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };
  var eachFeature = function(feature, layer) {
    layer.on('click', function (e) {
    $('#result').text("The floor of this property is: " + feature.properties.floor);
    });
  };
  var myFilter = function(feature) {
    if (feature.properties.floor !== "") {
    return true;
    }
  };
  $(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      layer2 = L.geoJson(parsedData, {
          onEachFeature: eachFeature,
          filter: myFilter,
          style: myStyle,
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          }
      }).addTo(map);
    });
  });
  $('#button_previous').show();
  $('#button_next').off();
  $('#button_next').click(function(){setslideThree();});
  $('#button_previous').off();
  $('#button_previous').click(function(){setslideOne();});
  $('#legend1').hide();
  $('#legend2').show();
  $('#legend3').hide();
};


setslideThree = function() {
  $('#heading').text('New Buildings');
  $('#text').text('Buildings that built after 2005 is shown, and colors represent price level. New buildings are not all expensive.');
    $('#text2').text('Click to see the built year of certain property');
    $('#result').text("");
    map.removeLayer(layer2);
    map.removeLayer(layer4);
    var myStyle = function(feature) {
      if (feature.properties.priceperm2 <= 20000) {
        return {fillColor: '#f3ecbc'};
      }
      else if (feature.properties.priceperm2 >20000 & feature.properties.priceperm2<= 30000) {
        return {fillColor: '#f4b657'};
      }
      else if (feature.properties.priceperm2 >30000 & feature.properties.priceperm2<= 40000) {
        return {fillColor: '#f1625d'};
      }
      else if (feature.properties.priceperm2 >40000 & feature.properties.priceperm2<= 50000) {
        return {fillColor: '#8dbeb1'};
      }
      else {
        return {fillColor: '#5d4c52'};
      }
    }; //for different price level, give different color.
  var geojsonMarkerOptions = {
    radius: 8,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };
  var eachFeature = function(feature, layer) {
    layer.on('click', function (e) {
    $('#result').text("The built-year of this property is: " + feature.properties.yearbuilt);
    });
  };
  var myFilter = function(feature) {
    if (feature.properties.yearbuilt >= 2005) {
    return true;
    }
  };
  $(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      layer3 = L.geoJson(parsedData, {
          onEachFeature: eachFeature,
          filter: myFilter,
          style: myStyle,
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          }
      }).addTo(map);
    });
  });
  $('#button_next').off();
  $('#button_next').click(function(){setslideFour();});
  $('#button_previous').off();
  $('#button_previous').click(function(){setslideTwo();});
  $('#legend2').hide();
  $('#legend1').show();
  $('#legend4').hide();
};

setslideFour = function() {
  $('#heading').text('Housing Area');
  $('#text').text('Housing area is shown with colors that represent different area level. Most apartments are not spacious.');
  $('#text2').text('Click to see the area of certain property');
    $('#result').text("");
    map.setView([39.917324, 116.397330], 11);
    map.removeLayer(layer3);
    map.removeLayer(layer5);
    var myStyle = function(feature) {
      if (feature.properties.area <= 50) {
        return {fillColor: '#f3ecbc'};
      }
      else if (feature.properties.area >50 & feature.properties.area<= 70) {
        return {fillColor: '#f4b657'};
      }
      else if (feature.properties.area >70 & feature.properties.area<= 100) {
        return {fillColor: '#f1625d'};
      }
      else if (feature.properties.area >100 & feature.properties.area<= 130) {
        return {fillColor: '#8dbeb1'};
      }
      else {
        return {fillColor: '#5d4c52'};
      }
    }; //for different price level, give different color.
  var geojsonMarkerOptions = {
    radius: 8,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };
  var eachFeature = function(feature, layer) {
    layer.on('click', function (e) {
    $('#result').text("The area of this property is: " + feature.properties.area + " square meters");
    });
  };
  var myFilter = function(feature) {
    if (feature.properties.area !== '') {
    return true;
    }
  };
  $(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      layer4 = L.geoJson(parsedData, {
          onEachFeature: eachFeature,
          filter: myFilter,
          style: myStyle,
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          }
      }).addTo(map);
    });
  });
  $('#button_next').show();
  $('#button_next').off();
  $('#button_next').click(function(){setslideFive();});
  $('#button_previous').off();
  $('#button_previous').click(function(){setslideThree();});
  $('#legend1').hide();
  $('#legend4').show();
};


setslideFive = function() {
  $('#heading').text('School District Housing');
  $('#text').text('A lot of school district housing at North.');
    $('#text2').text('');
    $('#result').text("");
    map.removeLayer(layer4);
  var geojsonMarkerOptions = {
    radius: 8,
    color: "#000",
    fillColor: '#f4b657',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };

  var myFilter = function(feature) {
    if (feature.properties.schooldistrict === '1') {
    return true;
    }
  };
  map.setView([39.986381, 116.382312], 12);
  $(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      layer5 = L.geoJson(parsedData, {
          filter: myFilter,
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          }
      }).addTo(map);
    });
  });
  $('#button_next').hide();
  $('#button_previous').off();
  $('#button_previous').click(function(){setslideFour();});
  $('#legend4').hide();
};
