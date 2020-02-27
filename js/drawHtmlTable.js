

/*

Recieve json data,
and, draw the header small table,
and, draw the footer. (timeleft & event)

*/


function drawHtmlTable (json)
{

	// build tables..
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	var htmlHeaderTable = "<table class ='small'><tr>";
	
	for (var i = 0; i < json.EVENT.DATA.length; i++)
	{
		htmlHeaderTable += "<td><div class='pos'>P" +  json.EVENT.DATA[i].INDEX + "</div></br><b>" + json.EVENT.DATA[i].PILOT + "</b></br>L" + json.EVENT.DATA[i].LAPS + ": " + json.EVENT.DATA[i].ABSOLUTTIME + "</br>L:" + json.EVENT.DATA[i].LAPTIME + " B:" + json.EVENT.DATA[i].BESTTIME + "</td>"
	}
	htmlHeaderTable += "</tr></table>";
	
	// draw tables..
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	document.getElementById ("smalltable").innerHTML = htmlHeaderTable;
	
	// gestion du footer..
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// draw timeleft..
	if (json.EVENT.METADATA.COUNTDOWN == "00:00:00"){
		document.getElementById("timeleft").innerHTML = json.EVENT.METADATA.REMAININGTIME;
	} else {
		document.getElementById("timeleft").innerHTML = json.EVENT.METADATA.COUNTDOWN;
	}
	
	// draw event name..
	document.getElementById ("eventname").innerHTML = json.EVENT.METADATA.GROUP + " - <b>geneva</b>modelcars";





	// ?..
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/*
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
	*/

}
