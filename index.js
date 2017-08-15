var BTN = document.getElementById("Submit");
var RESULTS = document.getElementById("js-search-results");
var x = document.getElementById('current');



//this part of the code obtains the current geolocation of the individual 
function getLocation(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
		console.log("user denied");
		x.innerHTML = "Geolocation is not supported by this browser.";
		$(".js-search-form").removeClass("hidden");
	}
}



//On home page there will be the small heading and the button to begin.
$("#begin").click(function () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
		$(".centralHeading").addClass("hidden");
	} else {
		console.log("user denied");
		x.innerHTML = "Geolocation is not supported by this browser.";
		$(".js-search-form").removeClass("hidden");
	}	
});


//in case of errors.
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


//This part will display in the HTML the current Latitude and Longitude as well as make the AJAX call to the API and returns the time of the sunrise.
function showPosition (position, error) {
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




