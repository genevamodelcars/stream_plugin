





function readSocketMessage (json)
{
//	console.log ("readSocketMessage..");
//	console.log (json);

	// build tables..
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	var htmlHeaderTable = "<table class ='small'><tr>";
	var htmlResumeTable = "<table class='resume'><tr><th>Pos</th><th>Driver</th><th>Laps</th><th>Time</th><th>Bestlap</th><th>Average</th></tr>";
	
	for (var i = 0; i < json.EVENT.DATA.length; i++)
	{
		htmlHeaderTable += "<td><div class='pos'>P" +  json.EVENT.DATA[i].INDEX + "</div></br><b>" + json.EVENT.DATA[i].PILOT + "</b></br>L" + json.EVENT.DATA[i].LAPS + ": " + json.EVENT.DATA[i].ABSOLUTTIME + "</br>L:" + json.EVENT.DATA[i].LAPTIME + " B:" + json.EVENT.DATA[i].BESTTIME + "</td>"
		htmlResumeTable += "<tr><td>" + json.EVENT.DATA[i].INDEX + "</td><td><b>" + json.EVENT.DATA[i].PILOT + "</b></td><td>" + json.EVENT.DATA[i].LAPS + "</td><td>" + json.EVENT.DATA[i].ABSOLUTTIME + "</td><td>" + json.EVENT.DATA[i].BESTTIME + "</td><td>" + json.EVENT.DATA[i].MEDIUMTIME + "</td></tr>";
	}
	htmlResumeTable += "</table>";
	htmlHeaderTable += "</tr></table>";
	
	// draw tables..
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	document.getElementById ("smalltable").innerHTML = htmlHeaderTable;
	document.getElementById ("resumetable").innerHTML = htmlResumeTable;
	
	// display resume table..
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	if (json.EVENT.METADATA.COUNTDOWN == "00:00:30") {
		$("#resumetable").fadeOut (1000);
	}
	
	if (json.EVENT.METADATA.CURRENTTIME == json.EVENT.METADATA.RACETIME) {
		$("#resumetable").fadeIn (1000);
	}
	
	if (json.EVENT.METADATA.CURRENTTIME == "00:00:01") {
		$("#resumetable").hide();
	}

	// gestion du footer..
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// draw timeleft..
	if (json.EVENT.METADATA.COUNTDOWN == "00:00:00"){
		document.getElementById("timeleft").innerHTML = json.EVENT.METADATA.REMAININGTIME;
	} else {
		document.getElementById("timeleft").innerHTML = json.EVENT.METADATA.COUNTDOWN;
	}
	
	// draw event name..
	document.getElementById ("eventname").innerHTML = json.EVENT.METADATA.GROUP;





	// ?..
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	if (json.EVENT.METADATA.COUNTDOWN == "00:00:11") {
		var timeleft = 11;
		var downloadTimer = setInterval (function (){
		timeleft--;
		
		if(timeleft < 1) {
				if (timeleft == 0) {
				$("#countdowntimer").fadeIn(250);
				document.getElementById("countdowntimer").textContent = "Go!";
				$("#countdowntimer").fadeOut(1000);
				clearInterval(downloadTimer);
				}
		}
		else {
			$("#countdowntimer").fadeIn(0);
			document.getElementById("countdowntimer").textContent = timeleft;
			$("#countdowntimer").fadeOut(1000);
		}
		},1000);
	}	

}
