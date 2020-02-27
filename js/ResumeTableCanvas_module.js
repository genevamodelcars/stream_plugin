'use strict';

window.	Application		= window.Application || {};

// voir: https://zestedesavoir.com/tutoriels/358/module-pattern-en-javascript/

Application.ResumeTableCanvas = (function (self)
{


//	=== P U B L I C ========================================================================================

	self.setTargetId = function (id)
	{
		_target = document.getElementById (id);
		
		_destroy ();
		_init ();
	};

	self.setData = function (data)
	{
		_resumeTable = new ch.gemc.myresults.results.ResumeTable ();
		/*
		zog ("_frame: " + _frame);
		zog (_frame);
		zog ("resize.. " + _frame.width + ", " + _frame.height);
		zog (_frame.stage);
		zog (_frame.stage.getBounds ());
		*/
		_resumeTable.setData (data);
		/*
		zog ("getBounds: " + _resumeTable.getBounds ());
		_resumeTable.addTo (_frame);
		*/
		_resumeTable.center (_frame.stage);
				// prevent blurring..
				_resumeTable.x = Math.round (_resumeTable.x);
				_resumeTable.y = Math.round (_resumeTable.y);
				/*
				*/
				_frame.stage.update ();
	};

	
//	=== P R I V A T E ======================================================================================
	
//	var _resumeTable = new ch.gemc.myresults.results.ResumeTable ();
	var _resumeTable;
	var _target;
	var _frame;
	
	function _destroy ()
	{
		//console.log ("_destroy..");
		// ..
	}
	
	function _init ()
	{
	//	console.log ("_init..");

		var assets = [];
		//	assets.push ({font:'fontLCD', src:"./assets/LCDMU___.TTF"});
			assets.push ({font:'fontLCD', src:"./assets/fonts/monospace/digital-7.ttf"});

		var scope, once;
		
		// create new canvas..
//		_frame		= new Frame ({scaling:'full'});
		_frame		= new Frame ({scaling:'full', assets:assets});
//		_frame.id	= 'TablesCanvas';
		
		// add to existing tag..
		// ISSUE: disapears on resize up !!!
		// ( no issue on resize down )
//		_frame		= new Frame ({scaling:_target.id});
		
		_frame.on	('ready', function ()
					{
//						_resumeTable.addTo ();
//						_resumeTable.center (this);
		
					},	scope=null, once=true);
		
		_frame.on	('resize', function ()
					{
					//	zog ("resize.. " + _frame.width + ", " + _frame.height);
					//	zog ("resize.. " + _resumeTable.getBounds ());
//						_resumeTable.resize (_frame.width, _frame.height);
						if (_resumeTable)
						{
							_resumeTable.center ();
							// prevent blurring..
							_resumeTable.x = Math.round (_resumeTable.x);
							_resumeTable.y = Math.round (_resumeTable.y);
						}
		
					},	scope=null, once=false);
	}



//	=== E N D ==============================================================================================

    return self;
}) (Application.ResumeTableCanvas || {});
