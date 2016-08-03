function BikeBundle() {
}

BikeBundle.prototype.getBikeYear = function(timestamp) {
  var date = new Date(timestamp*1000);
  var month = (date.getMonth() + 1);
  var day = date.getDate();
  var year = date.getFullYear();
  return month + "/" + day + "/" + year;
}

BikeBundle.prototype.getBikes = function(color, location) {
  $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&colors=' + color + '&proximity=' + location + '&proximity_square=100').then(function(response) {

    var date = new Date(response.bikes[0].date_stolen);
    var month = (date.getMonth() + 1);
    var day = date.getDate();
    var year = date.getFullYear();
    var dateString = month + "/" + day + "/" + year;

    var image = response.bikes[0].thumb;

    var bikeTitle = response.bikes[0].title;

    $('.showBikes').prepend(
      "<div class=\"card\">" +
      "<img class=\"card-img-top\" src=\"" + image + "\" alt=\"Card image cap\">" +
      "<div class=\"card-block\">" +
        "<h4 class=\"card-title\">" + bikeTitle + "</h4>" +
        "<p class=\"card-text\"> This bike was stolen on: " + dateString + "</p>" +
        "<a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>" +
      "</div>" +
    "</div>"
    );
  }).fail(function(error) {
    $('.showBikes').prepend(error.responseJSON.message);
  });
}

exports.bikesModule = BikeBundle;












// $('.showBikes').prepend('<p>' + response.bikes[0].title + '</p>' + '<img src="' + response.bikes[0].thumb + '"</img>');
