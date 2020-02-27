/*

ResumeTable.

*/

'use strict';

window.	ch							= window.ch || {};
		ch.gemc						= ch.gemc || {};
		ch.gemc.myresults			= ch.gemc.myresults || {};
		ch.gemc.myresults.results	= ch.gemc.myresults.results || {};


ch.gemc.myresults.results.ResumeTable = function (width, height, color, borderColor, borderWidth, corner, dashed, style, group, inherit)
{
	// Zim DUO..
	var duo;	if (duo = zob (ch.gemc.myresults.results.ResumeTable, arguments, null, this))	{return duo;}
	
	// params..
	color	= zim.clear;
//	color	= zim.white;
//	color	= zim.red;

	// constructor..
	this.Rectangle_constructor (width, height, color, borderColor, borderWidth, corner, dashed, style, group, inherit);
	

//	=== P U B L I C ========================================================================================
	
	this.name		= "the ResumeTable";
	
	this.setData	= _setData;


//	=== P R I V A T E ======================================================================================

	let _this				= this;
	let _data;
	let _boundsHolder		= this.getBounds ();
	let _rowsList			= [];
	let _colsListConfig		=
							[
							new ch.gemc.myresults.results.resumeTableClasses.ColumnConfig (60, "INDEX", "POS",				ch.gemc.myresults.results.resumeTableClasses.TableCell.POS,		ch.gemc.myresults.results.resumeTableClasses.TableCellHeader),
							new ch.gemc.myresults.results.resumeTableClasses.ColumnConfig (400, "PILOT", "DRIVER",			ch.gemc.myresults.results.resumeTableClasses.TableCell.DRIVER,	ch.gemc.myresults.results.resumeTableClasses.TableCellHeader),
							new ch.gemc.myresults.results.resumeTableClasses.ColumnConfig (60, "LAPS", "LAPS",				ch.gemc.myresults.results.resumeTableClasses.TableCell,			ch.gemc.myresults.results.resumeTableClasses.TableCellHeader),
							new ch.gemc.myresults.results.resumeTableClasses.ColumnConfig (200, "ABSOLUTTIME", "TIME",		ch.gemc.myresults.results.resumeTableClasses.TableCell,			ch.gemc.myresults.results.resumeTableClasses.TableCellHeader),
							new ch.gemc.myresults.results.resumeTableClasses.ColumnConfig (200, "BESTTIME", "BESTLAP",		ch.gemc.myresults.results.resumeTableClasses.TableCell,			ch.gemc.myresults.results.resumeTableClasses.TableCellHeader),
							new ch.gemc.myresults.results.resumeTableClasses.ColumnConfig (200, "MEDIUMTIME", "AVERAGE",	ch.gemc.myresults.results.resumeTableClasses.TableCell,			ch.gemc.myresults.results.resumeTableClasses.TableCellHeader),
							];

	
	function _setData (data)
	{
		_clearRows ();
		_data = data;
		_buildRows ();
		_doLayout	();
	}

	function _clearRows ()
	{
		for (var i=0; i<_rowsList.length; i++)
		{
			var row				= _rowsList [i];
				row.removeFrom	(this);
		}

		_rowsList = [];
		_data = null;
	}
	
	function _buildRows ()
	{
		// header..
		var row				= new ch.gemc.myresults.results.resumeTableClasses.TableRowHeader ();
			row.setColumns	(_colsListConfig, 40);
			row.setData		(null);
		_rowsList.push (row);
		
		// racers..
		for (var i=0; i<_data.EVENT.DATA.length; i++)
		{
			var row				= new ch.gemc.myresults.results.resumeTableClasses.TableRow ();
				row.setColumns	(_colsListConfig, 60);
				row.setData		(_data.EVENT.DATA [i]);
			_rowsList.push (row);
		}
	}

	function _doLayout ()
	{
		var currentY = 0;
		for (var i=0; i<_rowsList.length; i++)
		{
			var row			= _rowsList [i];
				row.addTo	(_this);
				row.pos		(0, currentY);
				currentY	+= row.height + 2;
		}
		_this.setBounds ();
		
		// is size changed..
		var currentBounds = _this.getBounds ();
		var isSizeChanged = currentBounds.height != _boundsHolder.height;
		_boundsHolder = currentBounds;

		// adjust the background..
		_this.shape.graphics.command.w = currentBounds.width;
		_this.shape.graphics.command.h = currentBounds.height;
		
		// dispatch resize..
		if (isSizeChanged)
		_this.dispatchEvent ('resize');

		if (_this.stage)
		_this.stage.update ();
	}
	
}

zim.extend (ch.gemc.myresults.results.ResumeTable, zim.Rectangle, null, "Rectangle");
