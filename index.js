//https://www.w3schools.com/html/html5_geolocation.asp & http://ip-api.com/docs/api:json https://freegeoip.net for reference
//https://www.w3schools.com/howto/howto_js_countdown.asp
var BTN = document.getElementById('Submit');
var RESULTS = document.getElementById('js-search-results');
var x = document.getElementById('current');

function getCoordinatesAndRenderSunriseTime() {
  console.log('loading');
  $.ajax({
    url: 'https://freegeoip.net/json/',
    dataType: 'text',
    success: function(jsonString) {
      const jsonObject = $.parseJSON(jsonString); // this is needed to access the data. Remember we need an object not strings
      console.log(jsonObject.city);
      $('#city').html(jsonObject.city);
      // console.log(jsonObject.latitude);
      // getReverseGeocode(jsonObject.latitude, jsonObject.longitude); //not calling the reverseGeocoder at this moment
      getNextSunriseTime(jsonObject);
      // if (document.getElementById("timer").innerHTML == "Now"){
      // 	getTomorrowSunriseTime(jsonObject);
      // }
      // else {
      // 	getNextSunriseTime(jsonObject);
      // }
    }
  });
  $('#js-sunset-hidden').on('click', function() {
    $('#js-sunset-hidden').addClass('hidden');
    $('#js-sunrise-hidden').removeClass('hidden');
  });
  $('#js-sunrise-hidden').on('click', function() {
    $('#js-sunrise-hidden').addClass('hidden');
    $('#js-sunset-hidden').removeClass('hidden');
  });
}

// For now not going to use the reverse Geocode function, but i'll have it here for future reference
function getReverseGeocode(lat, long) {
  $.ajax({
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyAU9ukLeu5nPJ2iRGqkQsY0uhLZq1nDkd4`,
    dataType: 'text',
    success: function(jsonString) {
      console.log('getReverseGeocode ran');
      console.log(jsonString);
      let jsonObject = $.parseJSON(jsonString);
      var location = jsonObject.results[1].formatted_address;
      // console.log(location);
      // console.log(location);
      $('#demo2').html(location);
    }
  });
}

//https://momentjs.com/docs/#/parsing/string-format/
function getNextSunriseTime(jsonObject) {
  $.ajax({
    url:
      'https://api.sunrise-sunset.org/json?lat=' +
      jsonObject.latitude +
      '&lng=' +
      jsonObject.longitude +
      '&date=today&formatted=0', //make sure it is not formatted
    dataType: 'text',
    success: function(dataString) {
      // console.log("getNextSunriseTime ran");
      var json = $.parseJSON(dataString);
      // console.log(json.results.sunrise);
      // console.log(new Date(json.results.sunrise).getTime());
      // console.log(new Date().getTime());

      if (new Date(json.results.sunrise).getTime() > new Date().getTime()) {
        var sunriseLocalTime = moment(json.results.sunrise)
          .utc()
          .local()
          .calendar();
        // const sunriseLocalTimeLowerCase = sunriseLocalTime.toLowerCase()
        // $('#js-search-results').addClass("sunrise");
        // insert code here delete a future class of sunset, they will be interchangeable
        $('#js-search-results').html(`${sunriseLocalTime.toLowerCase()}.`);
        getCountDown(json.results.sunrise);
        // console.log(sunriseLocalTime);
      } else {
        getTomorrowSunriseTime(jsonObject);
      }
    }
  });
}
function getTomorrowSunriseTime(jsonObject) {
  $.ajax({
    url:
      'https://api.sunrise-sunset.org/json?lat=' +
      jsonObject.latitude +
      '&lng=' +
      jsonObject.longitude +
      '&date=tomorrow&formatted=0', //make sure it is not formatted
    dataType: 'text',
    success: function(dataString) {
      // console.log('getTomorrowSunriseTime ran');
      var json = $.parseJSON(dataString);

      // console.log(json.results);
      var sunriseLocalTime = moment(json.results.sunrise)
        .utc()
        .local()
        .calendar();
      // $('#js-search-results').addClass("sunrise");
      // insert code here delete a future class of sunset, they will be interchangeable

      $('#js-search-results').html(`${sunriseLocalTime.toLowerCase()}`);
      getCountDown(json.results.sunrise);
      // console.log(sunriseLocalTime);
    }
  });
}

////https://www.w3schools.com/howto/howto_js_countdown.asp for reference
function getCountDown(countdownTime) {
  var formattedCountdownTime = moment(countdownTime).format(
    'MMM D, YYYY, HH:mm:ss'
  );
  // console.log(formattedCountdownTime);
  var countDownDate = new Date(formattedCountdownTime).getTime();
  // console.log(countDownDate);
  // Update the count down every 1 second
  var x = setInterval(function() {
    // Get todays date and time
    var now = new Date().getTime();
    // console.log(now);
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // Display the result in the element with id="demo"
    document.getElementById('timer').innerHTML =
      hours + ' hours ' + minutes + ' minutes and ' + seconds + ' seconds';
    // If the count down is finished, write some text
    if (distance < 1) {
      //then get tomorrows sunrise

      clearInterval(x);
      document.getElementById('timer').innerHTML = 'Now';
    }
  }, 250);
  // $('#js-select-sunset-header-button').fadeIn(3500);

  $('#sunrise-left').fadeIn(3500);
}

window.onload = getCoordinatesAndRenderSunriseTime();

//ERROR Handler
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML =
        'User denied the request for Geolocation. <br> Please refresh and allow request for Geolocation';
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = 'Location information is unavailable.';
      break;
    case error.TIMEOUT:
      x.innerHTML = 'The request to get user location timed out.';
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = 'An unknown error occurred.';
      break;
  }
}
