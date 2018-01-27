// function getNextSunsetTime(jsonObject, date) {
//   $.ajax({
//     url:
//       'https://api.sunrise-sunset.org/json?lat=' +
//       jsonObject.latitude +
//       '&lng=' +
//       jsonObject.longitude +
//       '&date=' +
//       date +
//       '&formatted=0', //make sure it is not formatted
//     dataType: 'text',
//     success: function(dataString) {
//       var json = $.parseJSON(dataString);
//       const sunsetLocalTime = moment(json.results.sunset)
//         .utc()
//         .local()
//         .calendar();
//       $('#js-search-results-sunset').html('');
//       $('#js-search-results-sunset').html(
//         `${sunsetLocalTime.toLowerCase()}.`
//       );
//       getSunsetCountDown(json.results.sunset);
//     }
//   });
// }

