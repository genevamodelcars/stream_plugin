/*

Column Config Object.

*/

'use strict';

window.	ch												= window.ch || {};
		ch.gemc											= ch.gemc || {};
		ch.gemc.myresults								= ch.gemc.myresults || {};
		ch.gemc.myresults.results						= ch.gemc.myresults.results || {};
		ch.gemc.myresults.results.resumeTableClasses	= ch.gemc.myresults.results.resumeTableClasses || {};



// see: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes

// ES 6:
class ColumnConfig
{

	constructor (width, dataName, label, cellClass, headerClass)
	{
		this._width = width;
		this._dataName = dataName;
		this._label = label;
		this._cellClass = cellClass;
		this._headerClass = headerClass;
	}

	get width ()			{	return this._width;	}
	set width (val)			{	null;	}
	
	get dataName ()			{	return this._dataName;	}
	set dataName (val)		{	null;	}
	
	get label ()			{	return this._label;	}
	set label (val)			{	null;	}
	
	get cellClass ()		{	return this._cellClass;	}
	set cellClass (val)		{	null;	}
	
	get headerClass ()		{	return this._headerClass;	}
	set headerClass (val)	{	null;	}

}
/*
*/

/*
// ES 5:
function ColumnConfig (dataName, label)
{
	var _dataName = dataName;
	var _label = label;
	
//	this.setDataName = null;
	this.getDataName = function () { return _dataName; }
	
//	this.setLabel = null;
	this.getLabel = function () { return _label; }
}
*/

ch.gemc.myresults.results.resumeTableClasses.ColumnConfig = ColumnConfig;
