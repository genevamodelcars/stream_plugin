'use strict';

window.	Application		= window.Application || {};

// voir: https://zestedesavoir.com/tutoriels/358/module-pattern-en-javascript/

Application.DemoData = (function (self)
{


//	=== P U B L I C ========================================================================================

	self.setCallbackFuncion = function (func)
	{
		_callback = func;
		
		_destroy ();
		_init ();
	};
	
	self.getJson = function ()
	{
		return _json;
	};
	
	
//	=== P R I V A T E ======================================================================================
	
	var _callback;
	var _json;
	
	function _destroy ()
	{
		//console.log ("_destroy..");
		// ..
	}
	
	function _init ()
	{
		_load ("./Json example/race UTF-16 LE 02.json");

		// TODO: simulate..
		/*
		var downloadTimer = setInterval (function ()
		{
			clearInterval (downloadTimer);
			// load..
		//	_load ("./Json example/race UTF-16 LE 02.json");
			// or, modify current..
			_json.EVENT.METADATA.COUNTDOWN = "00:00:11";
			_callback (_json);

		}, 2000);
		*/
	}

	function _load (filename)
	{
		var requestXHR						= createXHR ();
			requestXHR.open					("GET", filename, true);
			requestXHR.onreadystatechange	= function () 
											{
												if (requestXHR.readyState == 4) 
												{
													if (requestXHR.status != 404) 
													{
														_json = eval ("(" + requestXHR.responseText + ")");
														_callback (_json);
													} 
													else
													{
													//	console.log (" not found !");
													}
												}
											}
			requestXHR.send					(null);
	}

		
//	=== H E L P E R S ======================================================================================
		
	function createXHR () 
	{
		var request = false;
			try {
				request = new ActiveXObject('Msxml2.XMLHTTP');
			}
			catch (err2) {
				try {
					request = new ActiveXObject('Microsoft.XMLHTTP');
				}
				catch (err3) {
			try {
				request = new XMLHttpRequest();
			}
			catch (err1) 
			{
				request = false;
			}
				}
			}
		return request;
	}
	
	
//	=== E N D ==============================================================================================

    return self;
}) (Application.DemoData || {});
