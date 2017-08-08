var BTN = document.getElementById("Submit");
var RESULTS = document.getElementById("js-search-results");



BTN.addEventListener("click", function() {
	var LAT = document.getElementById("latitude").value;
	var LONG = document.getElementById('longitude').value;
	console.log(LAT,LONG);
	event.preventDefault();
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://api.sunrise-sunset.org/json?lat='+ LAT+ '&lng='+LONG);
	var ourData = JSON.parse(ourRequest.responseText);
	renderHTML(ourData);
	ourRequest.send();
	console.log(ourRequest.responseText);
});

function renderHTML(data){
	

	RESULTS.innerHTML= data;

};