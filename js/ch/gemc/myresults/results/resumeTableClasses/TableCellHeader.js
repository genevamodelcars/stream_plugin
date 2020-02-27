/*

ResumeTable Cell.

*/

'use strict';

window.	ch												= window.ch || {};
		ch.gemc											= ch.gemc || {};
		ch.gemc.myresults								= ch.gemc.myresults || {};
		ch.gemc.myresults.results						= ch.gemc.myresults.results || {};
		ch.gemc.myresults.results.resumeTableClasses	= ch.gemc.myresults.results.resumeTableClasses || {};


ch.gemc.myresults.results.resumeTableClasses.TableCellHeader = function (a, b, c, d, style, group, inherit)
{
	// Zim DUO..
	var duo;	if (duo = zob (ch.gemc.myresults.results.resumeTableClasses.TableCellHeader, arguments, null, this))	{return duo;}

	if (zot (a)) a = 100;	// a as width
	if (zot (b)) b = 40;	// b as height
	
	// constructor..
	this.Container_constructor (a, b, c, d, style, group, inherit);
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	this.name		= "TableCellHeader";
	
	this.setData = function (text)
	{
		this.label.text		= text != undefined? text: "?";
		this.label.center	(this);
		this.label.x		= Math.round (this.label.x);
		this.label.y		= Math.round (this.label.y);
	}




// ----------------------------------------------------------------------------------------

	this.bg	= new zim.Rectangle (this.width, this.height, zim.light).addTo (this);
	
	this.label	= new zim.Label ({
								text				:"Cell",
								size				:14,
//								font				:"Helvetica Neue",
								font				:"Arial",
								fontOptions			:"bold",
								color				:zim.dark,
								});
	this.label.center	(this);
	this.label.x		= Math.round (this.label.x);
	this.label.y		= Math.round (this.label.y);
}

zim.extend (ch.gemc.myresults.results.resumeTableClasses.TableCellHeader, zim.Container, null, "Container");
