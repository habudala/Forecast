$(document).ready(function(){

	var baseURL = "http://api.wunderground.com/api/";
	var apiKey = "004ee43afc5c6206";
	var mySubmit = document.getElementById("button");
	
	function form (e){

		e.preventDefault();

		var input;
		var fullURL;
		var state;

	/////////////////////////////CLIENT INPUT STRING MANIPULATION///////////////////////////////////////
		input = document.getElementById("input").value;
		input = input.trim();
		firstLetter = input.substring(0,1);
		otherLetters = input.substring(1);
		firstLetter = firstLetter.toUpperCase();
		input = firstLetter + otherLetters;
		
		var space = input.search(" ");

		if (space > -1) {
			 secLetterPos = space +1;
			 secLetter = input.substring(secLetterPos, secLetterPos + 1);
			 secLetter = secLetter.toUpperCase();
			 rest = input.slice(secLetterPos +1);
			 newSecWord = secLetter + rest;
			 firstWord = input.slice(0,space);
			 input = firstWord + " " + newSecWord;
			  
		}
		input = input.replace(/ /g,"_");
		//console.log(input); // I WORK!!!

	/////////////////////////////RETRIEVING JSON FROM UNDERGROUND WEATHER////////////////////////////////
		state = document.getElementById("selected").value;
		fullURL = baseURL + apiKey + "/conditions/forecast/q/" + state + "/" + input + ".json";
		console.log(e.target);
		function getData2 (e) { //console.log("I start"); //self check
			$.ajax({
				type: "GET",
				url: fullURL,
				timeout: 3000,
				success: function(data) {
					console.log(data); //self check

					// if(e.target)
					

				 targetLoc = data.current_observation.display_location.full;
				 targetIcon = data.current_observation.icon_url;
				 iconDesc = data.current_observation.weather;
				 currTempCel = data.current_observation.temp_c;
				 currTempFar = data.current_observation.temp_f;
				 maincontent = $("#maincontent");
				
				maincontent.html("<div id='location'>" + targetLoc + "</div>" + 
				"<br/>" + "<div id='mimg'><img src='" +targetIcon +
				"'/></div><br/><div id='mdesc'>" + iconDesc +
				 "</div><br/><div id='mtemp'><h4>Temperature: " +
				currTempCel + "&#8451;<br/>" + currTempFar + "&#8457; <h4></div>");


				},
				fail: function() {
					//console.log("fail sucka!"); //self check
				}

			}); 
		}
		getData2();
	}

	mySubmit.addEventListener("click", form, false);

//////////////////////////////////RETRIEVING JSON FROM OPENWEATHERMAP API/////////////////////////////////
	function thumbInfo () {
		//api.openweathermap.org/data/2.5/weather?q=London
	// api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=1111111111
		var baseURL = "http://api.openweathermap.org/data/2.5/";
		var apiKey = "&APPID=8bc0abd3d79d29fd03b0be4c4fbe5b71";
		var fullUrlI; //current conditions

		var mainCities =["San_Francisco","Los_Angeles","New_York","WashingtonDC"];
		
		for(var i = 0; i < mainCities.length; i++) {

			fullUrlI = baseURL + "weather?q=" + mainCities[i] + apiKey; 

			function getData1 () { //console.log("I start"); //self check

				var currTile = "tile" + (i + 1);
				var thisTile = document.getElementById(currTile);

				$.ajax({
					type: "GET",
					url: fullUrlI,
					timeout: 3000,
					success: function(data) {

					//console.log(data); //self check

					var thumbCity = data.name;
					var thumbTempKel = data.main.temp;
					var thumbTempCel = Math.round(Number(thumbTempKel - 273.15));
					var thumbTempFar = Math.round(Number(thumbTempCel * 1.8 + 32));
					var thumbMainDesc = data.weather[0].description;
					var thumbIconCode = data.weather[0].icon;
					var thumbIconUrl = "http://openweathermap.org/img/w/" + thumbIconCode + ".png";
					//console.log(thumbCity);

					//http://openweathermap.org/img/w/10d.png

					thisTile.innerHTML = "<div id='tname'>" + thumbCity + "</div><br/><div id='timg'><img src='" +
					thumbIconUrl +"' /></div><br/><div id='tdesc'>" + thumbMainDesc + 
					"</div><div id='ttemp'>Temperature: " +
				    thumbTempCel + "&#8451; / " + thumbTempFar + "&#8457;</div>" 
					},
					fail: function() {
					//console.log("fail sucka!"); //self check
					}
				});
			}
		
		getData1();

		}
	}

	thumbInfo();


	var myNavBar = document.getElementById("navbar");
	//console.log(myNavBar);
	myNavBar.addEventListener("click", classChange, false);

	function classChange (e) {

		var target = e.target;
		var currClass = target.getAttribute("class");
		var currActClass = document.getElementsByClassName("active")[0];
		var links = document.getElementsByTagName("a");

		
		if (currClass == "active") {
			//console.log("wassuuup??");
			}
			else{
			currActClass.className = "passive";
			target.removeAttribute("class");
			target.className = "active";
			//console.log(target)
			}

		if (links[0].className == "active") {
			if(input.value != false) {console.log("pop filed1");} else {console.log("empty1");}
		}
		else if(links[1].className == "active") {
			if(input.value != false) {console.log("pop field2");} else {console.log("empty2");}
		}
		else if(links[2].className == "active") {
			if(input.value != false) {console.log("pop field3");} else {console.log("empty3");}
		}
		else {
			if(input.value != false) {console.log("pop field4");} else {console.log("empty4");}
		}
		
		
			
			
	}
		
});

// NEXT STEPS
//ADD EVENT LISTENER TO THE 4 DAY FORECAST LINK 
// CREATE ACTIVE AND NONACTIVE CLASSES
// IN FORM, IF 4 DAY IS ACTIVE & TEXTIMPUT=TRUE ELSE...
// THEN WORRY ABOUT OTHER API CALLS









