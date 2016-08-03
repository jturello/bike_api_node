function Bike() {
}

Bike.prototype.getBikes = function(color, location) {
  $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&colors=' + color + '&proximity=' + location + '&proximity_square=100').then(function(response) {
    $('.showBikes').prepend('<p>' + response.bikes[0].title + '</p>' + '<img src="' + response.bikes[0].thumb + '"</img>');
  }).fail(function(error) {
    $('.showBikes').prepend(error.responseJSON.message);
  });
}

exports.bikesModule = Bike;







// $('.showBikes').prepend(
//   "<div class=\"card\">" +
//   "<img class=\"card-img-top\" src=\"...\" alt=\"Card image cap\">" +
//   "<div class=\"card-block\">" +
//     "<h4 class=\"card-title\">Card title</h4>" +
//     "<p class=\"card-text\">Some quick example text to build on the card title and make up the bulk of the card's content.</p>" +
//     "<a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>" +
//   "</div>" +
// "</div>"
// );
