$(document).ready(function(){

	var baseURL = "http://api.wunderground.com/api/";
	var apiKey = "004ee43afc5c6206";
	var mySubmit = document.getElementById("button");
	var links = document.getElementsByTagName("a");


	var maincontent = document.getElementById("maincontent");
	var retrData;
	var retrData2;
	var dayDate;
	var newWeekday;
	var newImg;
	var newDesc;
	var highTempDiv;
	var lowTempDiv;


	function form (e){

		e.preventDefault();

		var input;
		var fullURLI;
		var input;
		var fullURLII;
		var state;
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////CLIENT INPUT STRING MANIPULATION///////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////RETRIEVING JSON FROM UNDERGROUND WEATHER////////////////////////////////
		state = document.getElementById("selected").value;
		fullURLI = baseURL + apiKey + "/conditions/forecast/q/" + state + "/" + input + ".json";
		fullURLII = baseURL + apiKey + "/forecast10day/q/" + state + "/" + input + ".json";
		console.log(e.target);
		
		//http://api.wunderground.com/api/004ee43afc5c6206/forecast10day/q/CA/San_Francisco.json

		function getData (e) { 

////////////////////////////CURRENT AND 4-DAY FORECAST CASE JSON//////////////////////////////////////////
			//console.log("I start"); //self check

			if ((links[0].className == "active") || (links[1].className == "active"))
			{
				$.ajax({
					type: "GET",
					url: fullURLI,
					timeout: 3000,
					success: function(data) {
						console.log(data); //self check
					    retrData = data;
					    console.log(retrData);

						 if(links[0].className == "active") {
						 	runCurrent(retrData);
						}
						else 
						{
							runFourDay(retrData);
						}

					},
					fail: function() {
						alert("Sorry, something's gone terribly wrong. You should start running...");
					}

				}); 
			} else {

////////////////////////////////////////10-DAY FORECAST CASE JSON//////////////////////////////////////////
			
				$.ajax({
					type: "GET",
					url: fullURLII,
					timeout: 3000,
					success: function(data) {
						console.log(data); //self check
					    retrData2 = data;
					    runTenDay(retrData2);


					},
					fail: function() {
						alert("Sorry, something's gone terribly wrong. You should start running...");
					}

				});
			}
		}
		getData();
	}

	mySubmit.addEventListener("click", form, false);

////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////RETRIEVING JSON FROM OPENWEATHERMAP API///////////////////////////////
	
	function thumbInfo () {

/////////////////////api.openweathermap.org/data/2.5/weather?q=London/////// OPENWEATHER API FROMAT////
////////////// api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=1111111111////WITH API KEY

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

		////////http:////openweathermap.org/img/w/10d.png////// open weather icon url/////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////LINK DETECTION AND DISPLAY INFO CHANGE ENGINEERING//////////////////////////////
	

	function classChange (e) {

		var target = e.target;
		var currClass = target.getAttribute("class");
		var currActClass = document.getElementsByClassName("active")[0];
		
		
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
			if(input.value != false) {form(e);} else {console.log("empty1");}
		}
		else if(links[1].className == "active") {
			if(input.value != false) {form(e);}else {console.log("empty2");}
		}
		else if(links[2].className == "active") {
			if(input.value != false) {form(e); 
				// document.getElementById("bg").style.height = "300vh";
				} else {console.log("empty3");}
		}
		else {
			// if(input.value != false) {
				alert("Hello there! The site is a project in progress, but thanks for visiting! We appretiate your time."); 
			// else {console.log("empty4");}
		 }

	}

	var myNavBar = document.getElementById("navbar");
	myNavBar.addEventListener("click", classChange, false);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////RETRIEVED JSON DATA MANIPULATION CHAPTER I. (current forecast)//////////////////////////////////////

	function runCurrent () {
			console.log(retrData)
					
					 maincontent.innerHTML = "";
					 targetLoc = retrData.current_observation.display_location.full;
					 targetIcon = retrData.current_observation.icon_url;
					 iconDesc = retrData.current_observation.weather;
					 currTempCel = retrData.current_observation.temp_c;
					 currTempFar = retrData.current_observation.temp_f;
					 
					
					maincontent.innerHTML = "<div id='location'>" + targetLoc + "</div>" + 
					"<br/>" + "<div id='mimg'><img src='" +targetIcon +
					"'/></div><br/><div id='mdesc'>" + iconDesc +
					 "</div><br/><div id='mtemp'><h4>Temperature: " +
					currTempCel + "&#8451;<br/>" + currTempFar + "&#8457; <h4></div>";
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////RETRIEVED JSON DATA MANIPULATION CHAPTER II. (4-day forecast) ////////////////////////////////////

	function runFourDay () {

			maincontent.innerHTML = "";
					
			for(i = 0; i < retrData.forecast.simpleforecast.forecastday.length; i++) {
				currDay = retrData.forecast.simpleforecast.forecastday[i];

				var month = currDay.date.monthname;
				var date = currDay.date.day;
				var weekDay = currDay.date.weekday;

				var foreIconDesc = currDay.conditions;
				var foreIconUrl = currDay.icon_url;

				var highTempCel = currDay.high.celsius;
				var highTempFar = currDay.high.fahrenheit;

				var lowTempCel = currDay.low.celsius;
				var lowTempFar = currDay.low.fahrenheit;
						

				newDiv = document.createElement("div");
				dayDate = document.createElement("h3");
				newWeekday = document.createElement("h3");
				newImg = document.createElement("img");
				newDesc = document.createElement("h4");
				highTempDiv = document.createElement("h4");
				lowTempDiv = document.createElement("h4");
				

				newDiv.className = "fourdayfore";
				newImg.setAttribute("src",foreIconUrl);
				dayDate.innerHTML = month + " " + date;
				newWeekday.innerHTML = weekDay;
				newDesc.innerHTML = foreIconDesc;
				highTempDiv.innerHTML = "High: " + highTempCel +"&#8451; / " + highTempFar + "&#8457;<br/>";
				lowTempDiv.innerHTML = "Low; " + lowTempCel +"&#8451; / " + lowTempFar + "&#8457;";
						 	

				specsArr = [dayDate,newWeekday,newImg,newDesc,highTempDiv,lowTempDiv];
						 
				for (var j = 0; j < specsArr.length; j++) {
					newDiv.appendChild(specsArr[j]);
				}
						 	
				maincontent.appendChild(newDiv);
						
			}
	}


////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////RETRIEVED JSON DATA MANIPULATION CHAPTER III. (ten day forecast) ////////////////////////////////////

	function runTenDay () {

		maincontent.innerHTML = "";
		var tenDaysArr = retrData2.forecast.simpleforecast.forecastday;;
		for (var k = 0; k < tenDaysArr.length; k++) {

			var tenDMonth = tenDaysArr[k].date.monthname;
			var tenDDay = tenDaysArr[k].date.day;
			var tenDWeek = tenDaysArr[k].date.weekday;
			var tenDIcon = tenDaysArr[k].icon_url;

			var tenDHighCel = tenDaysArr[k].high.celsius;
			var tenDHighF = tenDaysArr[k].high.fahrenheit;
	
			var tenDLowCel = tenDaysArr[k].low.celsius;
			var tenDLowF = tenDaysArr[k].low.celsius;

			maincontent.innerHTML += "<div id='minicont'><h3>" + tenDMonth + " " + tenDDay +
						 			"</h3><br/><h3>" + tenDWeek + "</h3><br/><img src='" + 
						 			tenDIcon + "'/><h4> High " + tenDHighCel + 
						 			"&#8451; / " + tenDHighF + "&#8457; </h4><h4>Low: " + tenDLowCel + 
						 			"&#8451; / " + tenDLowF + "&#8457;</h4></div>";

						 			console.log(maincontent);
		}


	}


		
});













