$(document).ready(function() {
  $('#date-input-sunset').on('submit', function(e) {
    $('#date-input-sunset').addClass('hidden');
    $('#js-refresh-sunset').removeClass('hidden');
    $('#timer-date-sunset').addClass('hidden');

    e.preventDefault();
    const date = $('#date-sunset')[0].value;
    console.log(date); //format YYYY-MM-DD
    getCoordinatesAndRenderSunriseTime(date);
  });

  var RESULTS = document.getElementById('js-search-results-sunsets');
  var x = document.getElementById('current');

  function getCoordinatesAndRenderSunriseTime(date) {
    $.ajax({
      url: 'https://freegeoip.net/json/',
      dataType: 'text',
      success: function(jsonString) {
        const jsonObject = $.parseJSON(jsonString);
        // console.log(jsonObject.city);
        $('#city').html(jsonObject.city);
        $('#city-sunset').html(jsonObject.city);
        getNextSunsetTime(jsonObject, date);
      }
    });
  }

  function getNextSunsetTime(jsonObject, date) {
    console.log(date);
    $.ajax({
      url:
        'https://api.sunrise-sunset.org/json?lat=' +
        jsonObject.latitude +
        '&lng=' +
        jsonObject.longitude +
        '&date=' +
        date +
        '&formatted=0', //make sure it is not formatted
      dataType: 'text',
      success: function(dataString) {
        var json = $.parseJSON(dataString);
        const sunriseLocalTime = moment(json.results.sunrise).format(
          'MMMM Do YYYY, h:mm:ss a'
        );
        // .utc()
        // .local()
        // .calendar();

        $('#js-search-results-sunset').fadeOut(500, function() {
          $('#js-search-results-sunset').html(`${sunriseLocalTime}.`);
          $('#js-search-results-sunset').fadeIn(500);
        });

        getCountDown(json.results.sunrise);
      }
    });
  }

  ////https://www.w3schools.com/howto/howto_js_countdown.asp for reference
  function getCountDown(countdownTime) {
    var formattedCountdownTime = moment(countdownTime).format(
      'MMM D, YYYY, HH:mm:ss'
    );
    console.log(formattedCountdownTime);
    var countDownDate = new Date(formattedCountdownTime).getTime();
    // console.log(countDownDate);
    // Update the count down every 1 second
    var x = setInterval(function() {
      // Get todays date and time
      var now = new Date().getTime();
      // console.log(now);
      // Find the distance between now an the count down date
      var distance = countDownDate - now;
      // console.log(distance);
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      // console.log(days);
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // Display the result in the element with id="demo"
      $('#timer-sunset').fadeOut(500, function() {
        $('#timer-date-sunset').html(
          days +
            ' days ' +
            hours +
            ' hours ' +
            minutes +
            ' minutes and ' +
            seconds +
            ' seconds'
        );
        $('#timer-date-sunset').fadeIn(500);
      });

      if (distance < 1) {
        //then get tomorrows sunrise
        clearInterval(x);
        document.getElementById('timer-sunset').innerHTML = 'Passed';
      }
    }, 250);
  }
});
