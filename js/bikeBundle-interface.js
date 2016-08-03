var BikeBundle = require('./../js/bikeBundle.js').bikesModule;

$(document).ready(function() {
  var currentBikeObject = new BikeBundle();
  $('#ColorLocationSearch').click(function() {
    $('.cityResults').html("");
    var color = $('#color').val();
    var location = $('#location').val();
    currentBikeObject.getBikes(color, location);
  });
});
