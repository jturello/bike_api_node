var Bike = require('./../js/bike.js').bikesModule;

$(document).ready(function() {
  var currentBikeObject = new Bike();
  $('#ColorLocationSearch').click(function() {
    var color = $('#color').val();
    var location = $('#location').val();
    currentBikeObject.getBikes(color, location);
  });
});
