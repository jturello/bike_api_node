function BikeBundle() {
}

BikeBundle.prototype.getBikeYear = function(timestamp) {
  var date = new Date(timestamp*1000);
  var month = (date.getMonth() + 1);
  var day = date.getDate();
  var year = date.getFullYear();
  return month + "/" + day + "/" + year;
};

BikeBundle.prototype.compareColors = function(city) {
  var colors = ['red', 'blue', 'black', 'green', 'pink'];
  var responseString = "<h2>In " + city + " there are: </h2>";
  var done = colors.length;

  $(colors).each(function() {
    var color = this;
    $.get("https://bikeindex.org:443/api/v2/bikes_search/count?colors=" + color +  "&proximity=" + city + "&proximity_square=100&access_token=date_stolen").then(function(response) {
      var num_stolen = response.proximity;
      responseString += "<li class='list-group-item'>" + response.proximity + " stolen " + color + " bikes </li>";
      done -= 1;
      if(done === 0){
        $('#output').prepend(responseString);
      }
    }).fail(function(error) {
          $('#output').prepend(error.responseJSON.message);
        });
  });
};

BikeBundle.prototype.compareCities = function(city1, city2) {
  var city1Stolen;
  var city2Stolen;
  $.get('https://bikeindex.org:443/api/v2/bikes_search/count?proximity=' + city1 + '&proximity_square=100&access_token=date_stolen').then(function(response1) {
    city1Stolen = response1.proximity;
    $.get('https://bikeindex.org:443/api/v2/bikes_search/count?proximity=' + city2 + '&proximity_square=100&access_token=date_stolen').then(function(response2) {
      city2Stolen = response2.proximity;
      $('#output').prepend("<li>" + city1 + " has " + city1Stolen + " stolen bikes and " + city2 + " has " + city2Stolen + " stolen bikes.</li>");
    }).fail(function(error) {
      $('#output').prepend(error.responseJSON.message);
    });
  }).fail(function(error) {
    $('#output').prepend(error.responseJSON.message);
  });

};

BikeBundle.prototype.getBikes = function(color, location) {
  $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&colors=' + color + '&proximity=' + location + '&proximity_square=100').then(function(response) {

    for (var i = 0; i < response.bikes.length; i++) {

      var date = new Date(response.bikes[i].date_stolen * 1000);
      var month = (date.getMonth() + 1);
      var day = date.getDate();
      var year = date.getFullYear();
      var dateString = month + "/" + day + "/" + year;

      var image;

      if (response.bikes[i].thumb === null) {
       image = "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glossy-black-icons-transport-travel/038400-glossy-black-icon-transport-travel-transportation-bicycle.png";
      }
      else {
        image = response.bikes[i].thumb;
      }

      var bikeTitle = response.bikes[i].title;
      var bikeId = response.bikes[i].id;

      $('#output').prepend(
      "<li>" +
        "<div class=\"card\">" +
          "<img class=\"card-img-top\" src=\"" + image + "\" alt=\"Card image cap\" style=\"height: 300px; display: block;\">" +
          "<div class=\"card-block\">" +
            "<h4 class=\"card-title\">" + bikeTitle + "</h4>" +
            "<p class=\"card-text\"> This bike was stolen on: " + dateString + "</p>" +
            "<a target = \"_blank\" href=\"https://bikeindex.org/bikes/" + bikeId + "\" class=\"btn btn-primary\">View this Bike</a>" +
          "</div>" +
        "</div>" +
      "</li>"
      );
    }
  }).fail(function(error) {
    $('#output').prepend(error.responseJSON.message);
  });
};

exports.bikesModule = BikeBundle;
