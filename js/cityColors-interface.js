var BikeBundle = require('./../js/bikeBundle.js').bikesModule;

$(document).ready(function() {
  var currentBikeObject = new BikeBundle();
  $('#colorsInCity').click(function() {
    $("#output").empty();
    var city = $("#cityName").val();
    $("#output").prepend(currentBikeObject.compareColors(city));
  });
});
