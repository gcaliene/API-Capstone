//https://www.w3schools.com/html/html5_geolocation.asp for reference
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
			getSunriseTime(jsonObject);
		}
	})
};

function getSunriseTime(jsonObject) {
	$.ajax({
		url: 'https://api.sunrise-sunset.org/json?lat='+ jsonObject.lat + '&lng='+  jsonObject.lon +'&date=today',
		dataType: "text",
		success:function(dataString) {
			var json = $.parseJSON(dataString);
			$('#js-search-results').addClass("sunrise");
			$('#js-search-results').html('The sunrise will occur at <br> ' + toLocalTime(json.results.sunrise));
		}
	})
};

window.onload = getCoordinatesAndRenderSunriseTime();





//
// //this part of the code obtains the current geolocation of the individual
// function getLocation(){
// 	if (navigator.geolocation) {
// 		navigator.geolocation.getCurrentPosition(showPosition, showError);
// 	} else {
// 		console.log("user denied");
// 		x.innerHTML = "Geolocation is not supported by this browser.";
// 		$(".js-search-form").removeClass("hidden");
// 	}
// }
//
// //On home page there will be the small heading and the button to begin the callback.
// $("#begin").click(getLocation);





//This part will display in the HTML the current Latitude and Longitude as well as make the AJAX call to the API and returns the time of the sunrise.
function showPosition (position, error) { //
	console.log(position);
	x.innerHTML = "<h2>Results</h2>" + "Your geographic coordinate system is:"+ "<br>Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
	$.ajax({
		url: 'https://api.sunrise-sunset.org/json?lat='+ position.coords.latitude + '&lng='+ position.coords.longitude +'&date=today',
		dataType: "text",
		success:function(data) {
			var json = $.parseJSON(data);
			$('#js-search-results').addClass("sunrise");
			$('#js-search-results').html('The sunrise will occur at <br> ' + toLocalTime(json.results.sunrise));
		}
	});
}

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
