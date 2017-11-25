//https://www.w3schools.com/html/html5_geolocation.asp & http://ip-api.com/docs/api:json https://freegeoip.net for reference
//https://www.w3schools.com/howto/howto_js_countdown.asp
var BTN = document.getElementById("Submit");
var RESULTS = document.getElementById("js-search-results");
var x = document.getElementById('current');

function getCoordinatesAndRenderSunriseTime () {
	$.ajax({
		url: "http://ip-api.com/json",
		dataType: 'text',
		success: function(jsonString){
			// console.log(jsonString);
			var jsonObject = $.parseJSON(jsonString); // this is needed to access the data. Remember we need an object not strings
			// console.log(jsonObject.lon);
			// console.log(jsonObject.lat);
			// console.log(x);
			x.innerHTML = "<h2>Results</h2>" + "Your geographic coordinate system is:"+ "<br>Latitude: " + jsonObject.lat + "<br>Longitude: " + jsonObject.lon;
			getNextSunriseTime(jsonObject);
			// getSunriseTimeTomorrow(jsonObject);
		}
	})
};

function getNextSunriseTime(jsonObject) {
	$.ajax({
		url: 'https://api.sunrise-sunset.org/json?lat='+ jsonObject.lat + '&lng='+  jsonObject.lon +'&date=today&formatted=0',
		dataType: "text",
		success:function(dataString) {
		//	console.log(dataString);
			var json = $.parseJSON(dataString);
			console.log(json.results);
			// console.log(json);
			var localTime = moment(json.results.sunrise).utc().local().calendar();
			// var localTime = moment(json.results.sunrise).utc().local().format('MMMM Do YYYY, h:mm:ss a')

			var countDownTime = moment(json.results.sunrise, "h:mm:ss a");
			// console.log(moment().startOf(countDownTime).fromNow());
			// console.log(countDownTime);
			$('#js-search-results').addClass("sunrise");
      // insert code here delete a future class of sunset, they will be interchangeable
			$('#js-search-results').html('The next sunrise will occur at <br> ' + localTime);
			// getCountDown(countDownTime);
		}
	})
};



// function getSunriseTimeTomorrow(jsonObject) {
// 	var tomorrow = moment().add(1, 'days').calendar();
// 	console.log(tomorrow);
// 	$.ajax({
// 		url: 'https://api.sunrise-sunset.org/json?lat='+ jsonObject.lat + '&lng='+  jsonObject.lon +'&date=' + tomorrow,
// 		dataType: "text",
// 		success:function(dataString) {
// 		//	console.log(dataString);
// 			var json = $.parseJSON(dataString);
// 			// console.log(json.results);
// 			// console.log(json);
// 			console.log(json.results.sunrise);
// 			var countDownTime = moment(json.results.sunrise, "h:mm:ss a");
// 			console.log(moment().startOf(countDownTime).fromNow());
// 			console.log(countDownTime);
// 			$('#js-search-results').addClass("sunrise");
//       // insert code here delete a future class of sunset, they will be interchangeable
// 			$('#js-search-results').html('The sunrise will occur at <br> ' + countDownTime);
// 			// getCountDown(countDownTime);
// 		}
// 	})
// };



// //
// function getCountDown (countDownTime){
// 	// Update the count down every 1 second
// 	var x = setInterval(function() {
//
// 		// Get todays date and time
// 		var now = moment().format('h:mm:ss a');
// 		console.log(now);
//
// 		// Find the distance between now an the count down date
// 		var distance = countDownTime - now;
//
// 		// Time calculations for days, hours, minutes and seconds
// 		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// 		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
// 		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//
// 		// Display the result in the element with id="demo"
// 		document.getElementById("demo").innerHTML = hours + "h "
// 		+ minutes + "m " + seconds + "s ";
//
// 		// If the count down is finished, write some text
// 		if (distance < 0) {
// 			clearInterval(x);
// 			document.getElementById("demo").innerHTML = "EXPIRED";
// 		}
// 	}, 1000);
// }

//need to set up a countdowntimer til sunset/sunrise time

// Set the date we're counting down to
// var countDownDate = new Date("Jan 5, 2018 15:37:25").getTime();
//
// // Update the count down every 1 second
// var x = setInterval(function() {
//
// 	// Get todays date and time
// 	var now = new Date().getTime();
//
// 	// Find the distance between now an the count down date
// 	var distance = countDownDate - now;
//
// 	// Time calculations for days, hours, minutes and seconds
// 	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
// 	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// 	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
// 	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//
// 	// Display the result in the element with id="demo"
// 	document.getElementById("demo").innerHTML = days + "d " + hours + "h "
// 	+ minutes + "m " + seconds + "s ";
//
// 	// If the count down is finished, write some text
// 	if (distance < 0) {
// 		clearInterval(x);
// 		document.getElementById("demo").innerHTML = "EXPIRED";
// 	}
// }, 1000);

window.onload = getCoordinatesAndRenderSunriseTime();




//The next thing I would have to do is the conversion of the time to the local time.
function toLocalTime(UTCDateString){
    var CLT = new moment.utc(UTCDateString, 'hh:mm:ss a');
    var newDate = CLT.clone().local().format("h:mm:ss A");
    console.log(newDate);
	return newDate;
}


//ERROR Handler
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
           	x.innerHTML = "User denied the request for Geolocation. <br> Please refresh and allow request for Geolocation"
            break;
        case error.POSITION_UNAVAILABLE:
           	x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
