/*

ResumeTable Cell.

*/

'use strict';

window.	ch												= window.ch || {};
		ch.gemc											= ch.gemc || {};
		ch.gemc.myresults								= ch.gemc.myresults || {};
		ch.gemc.myresults.results						= ch.gemc.myresults.results || {};
		ch.gemc.myresults.results.resumeTableClasses	= ch.gemc.myresults.results.resumeTableClasses || {};


ch.gemc.myresults.results.resumeTableClasses.TableCell.DRIVER = function (a, b, c, d, style, group, inherit)
{
	// Zim DUO..
	var duo;	if (duo = zob (ch.gemc.myresults.results.resumeTableClasses.TableCell.DRIVER, arguments, null, this))	{return duo;}

	if (zot (a)) a = 100;	// a as width
	if (zot (b)) b = 40;	// b as height

	// constructor..
	this.Container_constructor (a, b, c, d, style, group, inherit);
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	this.name		= "TableCell.DRIVER";
	
	this.setData = function (text)
	{
		this.label.text			= text != undefined? text: "?";
//		this.label.label.font	= "bold 24px Helvetica Neue";
//		this.label.text			= this.label.text;	// TIPS: refresh size, if style changed !
		this.label.centerReg	(this);
		this.label.center		(this);
		this.label.x			= Math.round (this.label.x);
		this.label.y			= Math.round (this.label.y);

		this.label.animate	({
							from		:true,
						//	props		:{alpha:0, scale:10},
							props		:{alpha:0, y:-40},
							time		:500,
							ease		:'quadInOut',
							wait		:Math.random () * 500,
							})
}




// ----------------------------------------------------------------------------------------

	this.bg	= new zim.Rectangle (this.width, this.height, zim.black).addTo (this);
	
	this.label	= new zim.Label ({
								text				:"Cell",
								size				:24,
//								font				:"Helvetica Neue",
								font				:"Arial",
								fontOptions			:"bold",
								color				:zim.white,
								rollColor			:zim.red,
								});
	this.label.center	(this);
	this.label.x		= Math.round (this.label.x);
	this.label.y		= Math.round (this.label.y);
						
	// clipping..
	var shape						= new Shape ();
		shape.graphics.beginFill	('red').drawRect (0, 0, this.width, this.height);
	this.label.mask = shape;
}

zim.extend (ch.gemc.myresults.results.resumeTableClasses.TableCell.DRIVER, zim.Container, null, "Container");
