var BikeBundle = require('./../js/bikeBundle.js').bikesModule;

$(document).ready(function() {
  var currentBikeObject = new BikeBundle();
  $('#cityCompare').click(function() {
    $("#output").empty();
    var cities = $('#cities').val();
    cities = cities.split(',');
    currentBikeObject.compareCities(cities);
  });
});
