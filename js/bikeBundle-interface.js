var BikeBundle = require('./../js/bikeBundle.js').bikesModule;

$(document).ready(function() {
  var currentBikeObject = new BikeBundle();
  $('#ColorLocationSearch').click(function() {
    $("#output").empty();
    var color = $('#color').val();
    var location = $('#location').val();
    currentBikeObject.getBikes(color, location);
  });
});
