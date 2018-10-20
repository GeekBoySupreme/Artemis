//Click Events
 document.addEventListener("DOMContentLoaded", function() {
	//Toggle Nav Menu
	document.getElementById("menu").onclick=function(){
	    var navmenu = document.getElementById('mobile-navigation');
	    var button = document.getElementById('toggle-wrapper');
	    navmenu.classList.toggle('toggled');
	    button.classList.toggle('toggled');
	}
	//Learn More Launch Alerts Button window.
	document.getElementById("learn-more-btn").onclick=function(){
 		var dialog = document.getElementById('learn-more-dialog');
 		dialog.classList.toggle('learn-more-toggled');

 		var plusMinus = document.getElementById('plus-minus');
 		plusMinus.classList.toggle('fa-plus');
 		plusMinus.classList.toggle('fa-minus');
 	}
});

function closeResponse(){
	document.getElementById("form-result-overlay").onclick=function(e){
		e.preventDefault();
		var button = document.getElementById('form-result-wrapper');
		var overlay = document.getElementById('form-result-overlay');
		button.classList.add('hidden');
		overlay.classList.add('hidden');
		document.getElementById('response').innerHTML= '';
	}
}
var form1 = "mc-form-head";
var form2 = "mc-form-nav";
var form3 = "mc-form-page";
var input1 = "mc-email-head";
var input2 = "mc-email-nav";
var input3 = "mc-email-page";
function formSubmit(form, input){
	//HTTP request - Mailchimp API Form Submission.
	document.addEventListener("DOMContentLoaded", function() {
		document.getElementById(form).addEventListener("submit", function submit(e){
			e.preventDefault();

			var data = "email=" + encodeURIComponent(document.getElementById(input).value);
			var endpoint = document.getElementById(form).getAttribute('action');
			
			function formHttp(callback){
				var request = new XMLHttpRequest();
				
					request.onreadystatechange = function() {
						if (request.readyState === 4) {
				  		  if (request.status === 200) {
							//Parse returned string into an object, then pass the object to the callback function.
				        	var response = JSON.parse(request.responseText);
				       		callback(response);
				  		  } else {
				       console.log('JSON request error');
				    		}
						}
					}
				request.open("POST", endpoint , true);
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				request.send(data);
			}
			//Callback to show outcome of form submission
			function formResponse(response){
				var success = document.createTextNode('Thank you for signing up for Launch Alerts! Check your inbox for a confirmation email with more information!');
				var duplicate = document.createTextNode('You are already signed up for Launch Alerts! You will receive alerts when a launch is approaching!');
				var failure = document.createTextNode('Something went wrong!  Pleas submit your email again!');

				function responseCheck(text){
		        	document.getElementById('response').appendChild(text);
		        	document.getElementById('form-result-wrapper').classList.toggle('hidden');
		        	document.getElementById('form-result-overlay').classList.toggle('hidden');
				}
				if(response.id){
			        //successful adds will have an id attribute on the object
			        responseCheck(success);
			      	closeResponse();
				} else if (response.title == 'Member Exists') {
			        //MC wil send back an error object with "Member Exists" as the title
			        responseCheck(duplicate);
			        closeResponse();
			    } else {
			        //something went wrong with the API call
			   		responseCheck(failure);
			     	closeResponse();
			    }
		    }
			formHttp(formResponse);
		})
	});
}
formSubmit(form1, input1);
formSubmit(form2, input2);
formSubmit(form3, input3);
//HTTP Request - LaunchLibrary API data and pass to callback
function data(callback){
	var url = 'https://launchlibrary.net/1.2/launch/next/150/mode=verbose';
	var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (request.readyState === 4) {
			    if (request.status === 200) {
			        document.body.className = 'ok';
					//Parse returned string into an object, then pass the object to the callback function.
			        var data = JSON.parse(request.responseText);
			        callback(data);
			        console.log(data);
			    } else {
			        document.body.className = 'error';
			    }
			}
		};
	request.open("GET", url , true);
	request.send(null);
}
var launchArray = [];
//Callback function to handle LaunchLibrary.net data
function launchDisplay(data){
	//console.log(data);
	//Array of html data to print to page for each launch
	
	//Gather and store relevant data
	var names = [];
	var timestamps = [];
	var agencies = [];
 	var rockets = [];
	var missions = [];
	var launchMonth = [];
	var launchDay = [];
	var launchYear = [];
	var timeCheck = [];
	var netMonth = [];
	var netDate = [];
	var launchDate = [];
	var wsstamp = [];
	var westamp = [];
	var windowOpenMin = [];
	var windowOpenHr = [];
	var windowCloseHr = [];
	var windowCloseMin = [];
	var netClass = [];
	var vidLink = [];
	var launchID = [];
	var locations = [];
//Begin processing data.
	for(i = 0; i < data.launches.length; i++){
		//Get the names of the rockets and missions
		names.push(data.launches[i].name);	
	}
	//Split the Rockets and Missions apart and save them as separate variables.
	for (i = 0; i < names.length; i++) {
	    var temp = names[i].split(" | ");
	    temp[0] = temp[0].replace(/Full Thrust/g, 'FT');
	    rockets.push(temp[0]);
	    missions.push(temp[1]);
	}	
	for(i = 0; i < data.launches.length; i++){
		//Get Date information
		if(data.launches[i].windowstart === null){
			timestamps.push('Launch Ended');
		}else{
			timestamps.push(data.launches[i].windowstart);	
		}
		//Get Launch ID
		launchID.push(' id="' + data.launches[i].id);
		//Get unix timestamp for window opening and closing times
		wsstamp.push(data.launches[i].wsstamp);
		westamp.push(data.launches[i].westamp);
		//Get the name of the primary Launch Provider, and format it properly, or add an agency to the list.
		for(j = 0; j < 1; j++){
			if(data.launches[i].rocket.agencies.length > 0){
				if(data.launches[i].rocket.agencies[j].name === 'Lockheed Martin'){
					agencies.push('ULA');
				}else if(data.launches[i].rocket.agencies[j].name === 'United Launch Alliance'){
					agencies.push('ULA');
				}else if(data.launches[i].rocket.agencies[j].name === 'Orbital Sciences Corporation'){
					agencies.push('Orbital ATK');
				}else if(data.launches[i].rocket.agencies[j].name === 'Khrunichev State Research and Production Space Center'){
					agencies.push('Russia');
				}else if(data.launches[i].rocket.agencies[j].name === 'EADS Astrium Space Transportation'){
					agencies.push('Arianespace');
				}else if(data.launches[i].rocket.agencies[j].name === 'Avio S.p.A'){
					agencies.push('Arianespace');
				}else if(data.launches[i].rocket.agencies[j].name === 'Indian Space Research Organization'){
					agencies.push('India (ISRO)');
				}else if(data.launches[i].rocket.agencies[j].name === 'China Academy of Space Technology'){
					agencies.push('China');
				}else{
					agencies.push(data.launches[i].rocket.agencies[j].name);
				}
			}else if(rockets[i].indexOf('Long March') >= 0){
					agencies.push('China');
			}else if(rockets[i].indexOf('Soyuz-FG') >= 0){
					agencies.push('ISS');
			}else if(rockets[i].indexOf('Soyuz') >= 0 || rockets[i].indexOf('Proton') >= 0){
					agencies.push('Russia');
			}else if(rockets[i].indexOf('Rokot') >= 0){
					agencies.push('Eurokot');
			}else if(rockets[i].indexOf('GSLV') >= 0){
					agencies.push('India (ISRO)');
			}else if(rockets[i].indexOf('Electron') >= 0){
					agencies.push('Rocket Lab');
			}else if(rockets[i].indexOf('SLS') >= 0){
					agencies.push('NASA');
			}else{
					agencies.push('');
			}
		}
		//Get Webcast Link
		for(j = 0; j < 1; j++){
			if(data.launches[i].vidURLs.length > 0){
				vidLink.push(data.launches[i].vidURLs[j]);
			}else{
				vidLink.push('');
			}
		}
		//Get launchpad information
		for(j = 0; j < 1; j++){
			if (data.launches[i].location.pads.length > 0) {
				locations.push(data.launches[i].location.pads[j].name);
			}else{
				locations.push('Launchpad information not available')
			}
		}
	}
	//Convert Window Start time to local time and date
	for(i = 0; i < wsstamp.length; i++){
		var a = new Date(wsstamp[i] * 1000);
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var month = months[a.getMonth()];
		var day = a.getDate();
		var hr = a.getHours();
		var min = a.getMinutes();
		if(min<10) {
			min='0'+min
		}
		launchMonth.push(month);
		launchDay.push(day);
		windowOpenHr.push(hr);
		windowOpenMin.push(min);
	}
	//Split timestamps array into Month, Date, Year, timeCheck arrays
	for (i = 0; i < timestamps.length; i++) {
		var temp = timestamps[i].split(" ");
		netMonth.push(temp[0]);
		netDate.push(temp[1]);	
		launchYear.push(temp[2]);	
		timeCheck.push(temp[3]);
	}
	//Check if launch time is confirmed, and display date as confirmed. If time not confirmed, display NET before date.
	for(i = 0; i < timestamps.length; i++){
		var currentYear = new Date().getFullYear();
		if(timeCheck[i] === "00:00:00" &&  launchYear[i] == currentYear || launchMonth[i] == 'January'){
			launchDate.push('NET ' + netMonth[i] + ' ' + netDate[i] + ' ' + launchYear[i]);
			netClass.push(' net ');//add class to launch when NET 
		}else if(timeCheck[i] === "00:00:00" &&  launchYear[i] !== currentYear){
			launchDate.push('NET ' + netMonth[i] + ' ' + launchYear[i]);
			netClass.push(' net ');//add class to launch when NET
		}
		else{
			launchDate.push(launchMonth[i] + ' ' + launchDay[i] + ', ' +  launchYear[i]);
			netClass.push(' highlighted ');//add highlighted class if not NET.
		}
	}

	//Convert Window End Time to local time
	for(i = 0; i < westamp.length; i++){
		var localTimeStart = new Date(westamp[i] * 1000);
		var hr = localTimeStart.getHours();
		var min = localTimeStart.getMinutes();
		if(min<10) {
			min='0'+min
		}
		windowCloseHr.push(hr);
		windowCloseMin.push(min);
	}
	//Format Times                                                                                                                                                                                
	function window(hr, min){
		if(hr<12){
			if(hr === 0){
				return (hr+12) + ':' + min + ' am';
			}else{
				return hr + ':' + min + ' am';
			}
		}else {
			return (hr-12) + ':' + min + ' pm';
		}
	}
	//If default timestamp, don't display time.  If instantaneous launch window, display only open time. If launch window lasts a bit, display range.
	function launchTime(open, close, stamp){
		if(stamp === 0){
			return '<p class="time time-null">TBD</p>';
		}else if (open === close){
			return '<p class="time time-' + (i+1) + '">Instantaneous: ' + open + '</p>';
		}
		else{
			return '<p class="time time-' + (i+1) + '">Window: ' + open + '-' + close + '</p>';
		}
	}
	function webcast(link){
		if(link !== ""){
			return '<p class="webcast"><a href="' + link + '" title="Watch this launch!" target="_blank"><i class="fa fa-rocket" aria-hidden="true"></i>  Watch webcast</a></p>';
		}else{
			return '<p class="no-webcast">Webcast unavailable</p>';
		}
	}
	var agencyClass = [];

	function agency(){
		for (i = 0; i < timestamps.length; i++) {
			var agency = agencies[i].toLowerCase().split(' ');
			if(agency[0] === 'rocket'){
				agencyClass.push('rocketlab');
			}else{
				agencyClass.push(agency[0]);
			}
		}
	}
	agency();
	//Compile information for display, and push to launchArray
	for(i = 0; i < data.launches.length; i++){
		var launchInfo = '';
		launchInfo += '<div' + launchID[i] + '" class="launch' + netClass[i]  + agencyClass[i] +'">';
		launchInfo += '<div class="top-info"><p class="agency agency-' + (i+1) + '">' + agencies[i] + '</p>';
		launchInfo += '<p id="message1" class="message message1 hidden"></p><p id="message2" class="message message2 hidden"></p></div>';//Launch-specific Messages
		launchInfo += webcast(vidLink[i]);
		launchInfo += '<h3 class="rocket rocket-' + (i+1) + '">' + rockets[i] + '</h3>';
		launchInfo += '<h3 class="mission mission-' + (i+1) + '">' + missions[i] + '</h3>'; 
		launchInfo += '<p class="date date-' + (i+1) + '">' + launchDate[i] + '</p>'; 
		launchInfo += launchTime(window(windowOpenHr[i], windowOpenMin[i]), window(windowCloseHr[i], windowCloseMin[i]), wsstamp[i]); 
		launchInfo += '<p class="launchpad launchpad-' + (i+1) + '">' + locations[i] + '</p></div>';
		launchArray.push(launchInfo);
	}

}

data(function(data){
	launchDisplay(data);
	paginate();
	messages();
	sortLaunches();
});	
//Display only the first 24 launches, and add a show all launches button to show the rest.
function paginate(){
	var main = document.getElementById("launches-main");

	for(i = 0; i < launchArray.length; i++){
		if(main !== null){
			if(i < 24){
				document.querySelector('.uil-spin-css').classList.add('hidden');
				main.innerHTML += launchArray[i];
			}
		}else{
			if(i< 8){
				document.querySelector('.uil-spin-css').classList.add('hidden');
				document.getElementById("launches-side").innerHTML += launchArray[i];
			}
		}
	}
	if(main !== null){
		main.innerHTML += '<button id="more-launches" class="highlighted"><p>Show All Launches</p></button>';
		document.getElementById("more-launches").onclick=function(){
			main.innerHTML = '';
			for(i = 0; i < launchArray.length; i++){
				main.innerHTML += launchArray[i];
			}
		}
	}
}
//Launch-specific Messages
function messages(){
	function ses10(){
		var one = document.getElementById('1064');
		var two = document.getElementById('1064');
		if(one){
			one.querySelector('.message1').innerHTML = '<a href="http://www.ses.com/4233325/news/2016/22407810" title="First booster to fly a second mission" target="_blank">1st Reused Core!</a>';
			one.querySelector('.message1').classList.remove('hidden');	
		}
		if(two){
			two.querySelector('.message2').innerHTML = 'ASDS';
			two.querySelector('.message2').classList.remove('hidden');	
		}

	}
	function osiris(){
		var one = document.getElementById('673');
		if(one){
			one.querySelector('.message1').innerHTML = '<a href="http://www.patrick.af.mil/Portals/14/documents/Weather/AV-067%20OSIRIS-REx%20L-3%20Forecast.pdf?ver=2016-09-05-082408-593" title="Weather 70% GO" target="_blank">WX 70% GO</a>';
			one.querySelector('.message1').classList.remove('hidden');	
		}
	}
	function soyuzMS2(){
		var one = document.getElementById('1054');
		if(one){
			one.querySelector('.message1').innerHTML = '<a href="https://www.nasa.gov/mission_pages/station/expeditions/future.html" title="Crew to the International Space Station" target="_blank">Exp. 49 Crew';
			one.querySelector('.message1').classList.remove('hidden');	
		}	
	}
	function cygnusOA5(){
		var one = document.getElementById('775');
		if(one){
			one.querySelector('.message1').innerHTML = '<a href="https://www.orbitalatk.com/news-room/insideOA/AntaresUpdate/default.aspx" title="Return to Flight" target="_blank">Return to Flight</a>';
			one.querySelector('.message1').classList.remove('hidden');		
		}
	}
			
	ses10();
	soyuzMS2();
	cygnusOA5();
	osiris();
}

function getTimeZone(){
	var b = new Date(Date.now()).toString();
	var zone= b.substring(b.indexOf('('),b.indexOf(")")+1);
	var el = document.getElementById('timezone')
	if(el){
		el.innerHTML = zone;
	}
}
getTimeZone();


//Sort launches by toggle buttons
function sortLaunches(){
	var all = document.getElementById('all');
	var buttons = document.getElementsByClassName('sort-button');
	var launches = document.getElementsByClassName('launch');
	var spacex = document.getElementsByClassName('spacex');
	var ula = document.getElementsByClassName('ula');
	var ariane = document.getElementsByClassName('arianespace');
	var orbital = document.getElementsByClassName('orbital');
	var russia = document.getElementsByClassName('russia');
	var china = document.getElementsByClassName('china');
	var india = document.getElementsByClassName('india');
	var nasa = document.getElementsByClassName('nasa');
	var iss = document.getElementsByClassName('iss');
	var rocketlab = document.getElementsByClassName('rocketlab'); 
	var eurokot =  document.getElementsByClassName('eurokot');


	//showAll();
	function hideAll(){
		for(i =0; i < launches.length; i++){
			launches.item(i).classList.add('hidden');
		}
	}
	function showAll(){
		for(i =0; i < launches.length; i++){
			launches.item(i).classList.remove('hidden');
		}
		for(i = 0; i < buttons.length; i++){
			buttons.item(i).classList.remove('on');
		}

	}
	function displayAll(){
		var main = document.getElementById("launches-main");
		if(main !== null){
				main.innerHTML = '';
				for(i = 0; i < launchArray.length; i++){
					main.innerHTML += launchArray[i];
				}
		}
	}
	//create button click event
	if (document.addEventListener) {
	    document.addEventListener("click", handleClick, false);
	}
	else if (document.attachEvent) {
	    document.attachEvent("onclick", handleClick);
	}
	function handleClick(event) {
	    event = event || window.event;
	    event.target = event.target || event.srcElement;

	    var element = event.target;

	    // Climb up the document tree from the target of the event
	    while (element) {
	        if (element.nodeName === "BUTTON") {
	            // The user clicked on a <button> or clicked on an element inside a <button>
	            // with a class name called "foo"
	            toggleOn(element);
	            break;
	        }

	        element = element.parentNode;
	    }
	}
	//button is the button being clicked on.
	function toggleOn(button) {
		
		//button returns button element clicked on.
    	//toggle returns true if contains class on, false if not
    	//var toggle = button.classList.toggle('on');
    	var toggleId = document.querySelectorAll('#sort-launches button');
    	var id = button.id;

    	switch (id) {
    		case 'all':
    		    displayAll();
				hideAll();
    			showAll();
    			messages();
    			button.classList.add('on');
    			break;
    		case 'ariane':
    			displayAll();
				hideAll();
				for(j = 0; j < ariane.length; j++){
					ariane.item(j).classList.toggle('hidden');
				}
				for(i = 0; i < buttons.length; i++){
					buttons.item(i).classList.remove('on');
				}
				button.classList.add('on');
				messages();
				break;
	    	case 'spacex':
	    	case 'ula':
			case 'orbital':
			case 'russia':
			case 'china':
			case 'india':
			case 'nasa':
			case 'iss':
			case 'rocketlab':
			case 'eurokot':
				displayAll();
				hideAll();
				var launchProvider = document.getElementsByClassName(id);
				for(j = 0; j < launchProvider.length; j++){
					launchProvider.item(j).classList.toggle('hidden');
				}
				for(i = 0; i < buttons.length; i++){
					buttons.item(i).classList.remove('on');
				}
				button.classList.add('on');
				messages();
				break;
    	}
	}
}
