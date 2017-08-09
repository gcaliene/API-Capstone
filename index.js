var BTN = document.getElementById("Submit");
var RESULTS = document.getElementById("js-search-results");

//this part of the code obtains the current geolocation of the individual 
var x = document.getElementById('current');
function getLocation(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

//This part will display in the HTML the current Latitude and Longitude
function showPosition (position) {
	x.innerHTML = "Latitude: " + position.coords.latitude +
	"<br>Longitude: " +position.coords.longitude;
}
BTN.addEventListener("click", function() {
	var LAT = document.getElementById("latitude").value;
	var LONG = document.getElementById('longitude').value;
	//console.log(LAT,LONG);
	event.preventDefault();
	
	$.ajax({
		url: 'https://api.sunrise-sunset.org/json?lat='+ LAT+ '&lng='+LONG,
		dataType: "text",
		success:function(data) {
			
			var json = $.parseJSON(data);
			$('#js-search-results').html('The sunset will occur at ' + json.results.sunset);
		}
	});

	//tried to just use js but it didn't work
	//var ourRequest = new XMLHttpRequest();
	//ourRequest.open('GET', 'https://api.sunrise-sunset.org/json?lat='+ LAT+ '&lng='+LONG);
	//var ourData = JSON.parse(ourRequest.responseText);
	//renderHTML(ourData);
	//ourRequest.send();
	//console.log(ourRequest.responseText);
});

