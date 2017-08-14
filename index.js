var BTN = document.getElementById("Submit");
var RESULTS = document.getElementById("js-search-results");

//this part of the code obtains the current geolocation of the individual 
var x = document.getElementById('current');

//gets the location from the user's device.
function getLocation(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
		//$(".js-search-form").addClass("hidden"); not necessary

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
		//$(".js-search-form").addClass("hidden"); not necessary


	} else {
		console.log("user denied");
		x.innerHTML = "Geolocation is not supported by this browser.";
		$(".js-search-form").removeClass("hidden");
	}	// body...
});

//in case of errors.
function showError(error) {
	console.log(error);
    switch(error.code) {
        		case error.PERMISSION_DENIED:
           			x.innerHTML = "User denied the request for Geolocation. <br> Please refresh and allow request for Geolocation"
           			//$(".js-search-form").removeClass("hidden");
            		break;
        		case error.POSITION_UNAVAILABLE:
           			x.innerHTML = "Location information is unavailable."
           			//$(".js-search-form").removeClass("hidden");
            		break;
        		case error.TIMEOUT:
            		x.innerHTML = "The request to get user location timed out."
            		//$(".js-search-form").removeClass("hidden");
            		break;
        		case error.UNKNOWN_ERROR:
            		x.innerHTML = "An unknown error occurred."
            		break;
    		}
		}	


//This part will display in the HTML the current Latitude and Longitude
function showPosition (position, error) {
	x.innerHTML = "<h2>Results</h2>" + "Your geographic coordinate system is:"+"<br>Latitude: " + position.coords.latitude +
	"<br>Longitude: " + position.coords.longitude;
	
	$("#Submit").click(function() { 
			var LAT = document.getElementById("latitude").value;
			var LONG = document.getElementById('longitude').value;
	
			//event.preventDefault();
			$.ajax({
				url: 'https://api.sunrise-sunset.org/json?lat='+ LAT+ '&lng='+LONG ,
				dataType: "text",
				success:function(data) {
					var json = $.parseJSON(data);
					$('#js-search-results').html('The sunrise will occur at <br> <' +toLocalTime(json.results.sunrise));
				}
			});
		});

//This returns the time of the sunrise
	$.ajax({
		url: 'https://api.sunrise-sunset.org/json?lat='+ position.coords.latitude + '&lng='+ position.coords.longitude +'&date=today',
		dataType: "text",
		success:function(data) {
			var json = $.parseJSON(data);
			$('#js-search-results').html('The sunrise will occur at <br> ' + toLocalTime(json.results.sunrise));
		}
	});
}

//The next thing I would have to do is the conversion of the time to the local time. 
function toLocalTime(UTCDateString){
		console.log(UTCDateString);
        var CLT = new moment.utc(UTCDateString, 'hh:mm:ss a');
        console.log(CLT);
        var newDate = CLT.clone().local().format("h:mm:ss A"); 
       // var newDate = new Date(CLT.getTime()+convertedLocalTime.getTimezoneOffset()*60*1000);
        console.log(newDate);
   // var offset = date.getTimezoneOffset() / 60;
  //  var hours = date.getHours();

  //  newDate.setHours(hours - offset);

    return newDate; 
       // console.log(Date(convertedLocalTime + 'UTC').toString());
     //   console.log()
     //   var hourOffset = convertedLocalTime.getTimezoneOffset() / 60;

      //  convertedLocalTime.setHours(convertedLocalTime.getHours() + hourOffset ); 
      //  return convertedLocalTime;
}





