$(document).ready(function(){



var baseURL = "http://api.wunderground.com/api/";
var apiKey = "004ee43afc5c6206";
var input;
var fullURL;
var state;
var mySubmit = document.getElementById("button");
mySubmit.addEventListener("click", form, false);

function form (e){

	e.preventDefault();
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

	function getData () { //console.log("I start"); //self check
		$.ajax({
		type: "GET",
		url: fullURL,
		timeout: 3000,
		success: function(data) {
			console.log(data); //self check

		},
		fail: function() {
			//console.log("fail sucka!"); //self check
		}

		});
	
	

	 
	}
	getData();
}

});











