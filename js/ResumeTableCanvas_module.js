'use strict';

window.	Application		= window.Application || {};

// voir: https://zestedesavoir.com/tutoriels/358/module-pattern-en-javascript/

Application.ResumeTableCanvas = (function (self)
{


//	=== P U B L I C ========================================================================================

	self.setCountDown = function (value)
	{
		_countDownText.text	= value;
		_invalidate ('invalidateLayout');
		_frame.stage.update ();
	};

	self.setAlpha = function (value)
	{
		createjs.Tween	.get				(_resumeTable, { loop:false, override:true })
						.to					({ alpha:value }, 500, createjs.Ease.getPowInOut(2))
						.addEventListener	('change', function ()
											{
												_frame.stage.update ();
											})
						;
	};

	/**
	 * TODO: a détailler..
	 * 
	 * Gère le 'zim.Frame'.
	 */
	self.setTargetId = function (id)
	{
		if (document.getElementById (id) == _target)
		return;

		_target = document.getElementById (id);
		
		_destroy ();
		_init ();
	};

	/*
	self.setVisible = function (state)
	{
		if (_resumeTableVisibleState == state)
		return;

		_resumeTableVisibleState = state;
		_invalidate ('invalidateLayout');
	};
	*/

	self.setData = function (data)
	{
		if (_resumeTableData == data)
		return;
		
		_resumeTableData = data;
		_invalidate ('invalidateData');
		_invalidate ('invalidateSize');
		_invalidate ('invalidateLayout');
	};

	
//	=== P R I V A T E ======================================================================================
	
	var _resumeTable = new ch.gemc.myresults.results.ResumeTable ();
//	var _resumeTable;
	var _resumeTableData;
//	var _resumeTableVisibleState;
	var _target;
	var _frame;
	var _countDownText	= new createjs.Text ("", "300px fontLCD", "#ff0000");
	
	function _invalidate (flag)
	{
		switch (flag)
		{
			case 'invalidateData':

				_resumeTable.setData (_resumeTableData);
				break;

			case 'invalidateSize':
			case 'invalidateLayout':

				if (_frame && _frame.stage)
				_resumeTable.center (_frame.stage);
				// prevent blurring..
				_resumeTable.x = Math.round (_resumeTable.x);
				_resumeTable.y = Math.round (_resumeTable.y);

				_countDownText.y	= (_frame.stage.height - _countDownText.getMeasuredHeight ()) /2;
				_countDownText.x	= (_frame.stage.width - _countDownText.getMeasuredWidth ()) /2;
				// prevent blurring..
				_countDownText.x = Math.round (_countDownText.x);
				_countDownText.y = Math.round (_countDownText.y);
				
			//	_frame.stage.update ();
				break;
		}
	}
	
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
		
		// add to an existing HTMLElement tag..
		// ISSUE: disapears on resize up !!!
		// ( no issue on resize down )
	//	_frame		= new zim.Frame ({scaling:_target.id, assets:assets});
		
		// or, create new canvas..
		_frame		= new zim.Frame ({scaling:'full', assets:assets});

		_frame.id	= 'TablesCanvas';
		
		_frame.on	('ready', function ()
					{
						_resumeTable.alpha = 0.0;
						_frame.stage.addChild (_countDownText);
		
					},	scope=null, once=true);
		
		_frame.on	('resize', function ()
					{
						_invalidate ('invalidateSize');
		
					},	scope=null, once=false);

	}



//	=== E N D ==============================================================================================

    return self;
}) (Application.ResumeTableCanvas || {});
