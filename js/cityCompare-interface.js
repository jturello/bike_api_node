var BikeBundle = require('./../js/bikeBundle.js').bikesModule;

$(document).ready(function() {
  var currentBikeObject = new BikeBundle();
  $('#cityCompare').click(function() {
    var city1 = $("#city1").val();
    var city2 = $("#city2").val();
    currentBikeObject.compareCities(city1, city2);
  });
});
