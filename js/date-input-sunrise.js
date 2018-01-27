$(document).ready(function() {
  $('#date-input-sunrise').on('submit', function(e) {
    $('#date-input-sunrise').addClass('hidden');
    $('#js-refresh').removeClass('hidden');
    $('#timer-date').addClass('hidden');

    e.preventDefault();
    const date = $('#date')[0].value;
    console.log(date); //format YYYY-MM-DD
    getCoordinatesAndRenderSunriseTime(date);
  });

  var RESULTS = document.getElementById('js-search-results');
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
        getNextSunriseTime(jsonObject, date);
        getNextSunsetTime(jsonObject, date);
      }
    });
  }

  function getNextSunriseTime(jsonObject, date) {
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
        console.log(dataString);
        const sunriseLocalTime = moment(json.results.sunrise)
          .utc()
          .local()
          .calendar();

        $('#js-search-results').fadeOut(1000, function() {
          $('#js-search-results').html(`${sunriseLocalTime}.`);
          $('#js-search-results').fadeIn(1000);
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
    console.log(countDownDate);
    // Update the count down every 1 second
    var x = setInterval(function() {
      // Get todays date and time
      var now = new Date().getTime();
      // console.log(now);
      // Find the distance between now an the count down date
      var distance = countDownDate - now;
      console.log(distance);
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      console.log(days);
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // Display the result in the element with id="demo"
      $('#timer').fadeOut(1000, function() {
        $('#timer-date').html(
          days +
            ' days ' +
            hours +
            ' hours ' +
            minutes +
            ' minutes and ' +
            seconds +
            ' seconds'
        );
        $('#timer-date').fadeIn(1000);
      });

      if (distance < 1) {
        //then get tomorrows sunrise

        clearInterval(x);
        $('#timer-input').html('');
        document.getElementById('timer').innerHTML = 'Passed';
      }
    }, 250);

    // $('#sunrise-left').fadeIn(2000);
  }

  // function getSunsetCountDown(countdownTime) {
  //   var formattedCountdownTime = moment(countdownTime).format(
  //     'MMM D, YYYY, HH:mm:ss'
  //   );
  //   // console.log(formattedCountdownTime);
  //   var countDownDate = new Date(formattedCountdownTime).getTime();
  //   // console.log(countDownDate);
  //   // Update the count down every 1 second
  //   var x = setInterval(function() {
  //     // Get todays date and time
  //     var now = new Date().getTime();
  //     // console.log(now);
  //     // Find the distance between now an the count down date
  //     var distance = countDownDate - now;
  //     // Time calculations for days, hours, minutes and seconds
  //     var hours = Math.floor(
  //       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //     // Display the result in the element with id="demo"
  //     $('#timer-sunset').html('');
  //
  //     document.getElementById('timer-sunset').innerHTML =
  //       hours + ' hours ' + minutes + ' minutes and ' + seconds + ' seconds';
  //     // If the count down is finished, write some text
  //     if (distance < 1) {
  //       //then get tomorrows sunrise
  //
  //       clearInterval(x);
  //       $('#timer-sunset').html('');
  //
  //       document.getElementById('timer-sunset').innerHTML = 'Now';
  //     }
  //   }, 250);
  //   // $('#js-select-sunset-header-button').fadeIn(3500);
  //
  //   // $('#sun-left').fadeIn(3500);
  // }
});
