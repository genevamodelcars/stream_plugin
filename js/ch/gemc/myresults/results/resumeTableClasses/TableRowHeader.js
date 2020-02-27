/*

ResumeTable Rows.

( for now, cols is hardcoded ! )

*/

'use strict';

window.	ch												= window.ch || {};
		ch.gemc											= ch.gemc || {};
		ch.gemc.myresults								= ch.gemc.myresults || {};
		ch.gemc.myresults.results						= ch.gemc.myresults.results || {};
		ch.gemc.myresults.results.resumeTableClasses	= ch.gemc.myresults.results.resumeTableClasses || {};


ch.gemc.myresults.results.resumeTableClasses.TableRowHeader = function (a, b, c, d, style, group, inherit)
{
	// Zim DUO..
	var duo;	if (duo = zob (ch.gemc.myresults.results.resumeTableClasses.TableRowHeader, arguments, null, this))	{return duo;}

	// constructor..
	this.Container_constructor (a, b, c, d, style, group, inherit);
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	this.name		= "the ResumeTable Row";
	
	this._doLayout = function ()
	{
		if (_columnList.length.length <=0)	return;

		// start at 1 !
		var currentX = Math.round (this.getChildAt (0).width +2);
		for (var i=1; i<_columnList.length; i++)
		{
			var cell = this.getChildAt (i);
			cell.mov (currentX, 0);
			currentX += Math.round (cell.width +2);
		}
	}
	
	var _columnList;
	/**
	 * Draw each cell.
	 */
	this.setColumns = function (columnList, rowHeight)
	{
		_columnList = columnList;

		for (var i=0; i<_columnList.length; i++)
		{
			var columnConfig = _columnList [i];	// ch.gemc.myresults.results.resumeTableClasses.ColumnConfig
			// use the Header Cell Class !
			var cell			= new columnConfig.headerClass (columnConfig.width, rowHeight);
				cell.addTo		(this);
		}
		this._doLayout ();
	}
	
//	var _data;
	/**
	 * Populate the cells.
	 */
	this.setData = function (data)
	{
		// header has no data !!!
		// so, use the label prop of 'ColumnConfig'..

		for (var i=0; i<_columnList.length; i++)
		{
			var columnConfig = _columnList [i];	// ch.gemc.myresults.results.resumeTableClasses.ColumnConfig
	
			var cell			= this.getChildAt (i);
				cell.setData	(columnConfig.label, "bold");
		}

	}

}

zim.extend (ch.gemc.myresults.results.resumeTableClasses.TableRowHeader, zim.Container, null, "Container");
