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
//	color	= zim.clear;
//	color	= zim.white;
	color	= 'red';
//	color	= zim.red;	// for debug

	// constructor..
	this.Rectangle_constructor (width, height, color, borderColor, borderWidth, corner, dashed, style, group, inherit);
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	this.name	= "the ResumeTable";
	
	this._data;
	this.rowsList = [];
	this._colsListConfig	=
							[
							new ch.gemc.myresults.results.resumeTableClasses.ColumnConfig (60, "INDEX", "POS",				ch.gemc.myresults.results.resumeTableClasses.TableCell.POS,		ch.gemc.myresults.results.resumeTableClasses.TableCellHeader),
							new ch.gemc.myresults.results.resumeTableClasses.ColumnConfig (400, "PILOT", "DRIVER",			ch.gemc.myresults.results.resumeTableClasses.TableCell.DRIVER,	ch.gemc.myresults.results.resumeTableClasses.TableCellHeader),
							new ch.gemc.myresults.results.resumeTableClasses.ColumnConfig (60, "LAPS", "LAPS",				ch.gemc.myresults.results.resumeTableClasses.TableCell,			ch.gemc.myresults.results.resumeTableClasses.TableCellHeader),
							new ch.gemc.myresults.results.resumeTableClasses.ColumnConfig (200, "ABSOLUTTIME", "TIME",		ch.gemc.myresults.results.resumeTableClasses.TableCell,			ch.gemc.myresults.results.resumeTableClasses.TableCellHeader),
							new ch.gemc.myresults.results.resumeTableClasses.ColumnConfig (200, "BESTTIME", "BESTLAP",		ch.gemc.myresults.results.resumeTableClasses.TableCell,			ch.gemc.myresults.results.resumeTableClasses.TableCellHeader),
							new ch.gemc.myresults.results.resumeTableClasses.ColumnConfig (200, "MEDIUMTIME", "AVERAGE",	ch.gemc.myresults.results.resumeTableClasses.TableCell,			ch.gemc.myresults.results.resumeTableClasses.TableCellHeader),
							];

	this._clearRows = function ()
	{
		for (var i=0; i<this.rowsList.length; i++)
		{
			var row				= this.rowsList [i];
				row.removeFrom	(this);
		}

		this.rowsList = [];
		this._data = null;
	}
	
	this._buildRows = function ()
	{
		// header..
		var row				= new ch.gemc.myresults.results.resumeTableClasses.TableRowHeader ();
			row.setColumns	(this._colsListConfig, 40);
			row.setData		(null);
		this.rowsList.push (row);
		
		// racers..
		for (var i=0; i<this._data.EVENT.DATA.length; i++)
		{
			var row				= new ch.gemc.myresults.results.resumeTableClasses.TableRow ();
				row.setColumns	(this._colsListConfig, 60);
				row.setData		(this._data.EVENT.DATA [i]);
			this.rowsList.push (row);
		}
	}
	
	this._doLayout = function ()
	{
		var currentY = 0;
		for (var i=0; i<this.rowsList.length; i++)
		{
			var row			= this.rowsList [i];
				row.addTo	(this);
				row.pos		(0, currentY);
				currentY	+= row.height + 2;
		}
		this.setBounds ();

		// adjust the background..
		this.shape.graphics.command.w = this.getBounds ().width;
		this.shape.graphics.command.h = this.getBounds ().height;
	}
	
	this.setData = function (data)
	{
		this._clearRows ();
		this._data = data;
		this._buildRows ();
		this._doLayout	();
	}

}

zim.extend (ch.gemc.myresults.results.ResumeTable, zim.Rectangle, null, "Rectangle");
