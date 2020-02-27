/*

ResumeTable Cell.

*/

'use strict';

window.	ch												= window.ch || {};
		ch.gemc											= ch.gemc || {};
		ch.gemc.myresults								= ch.gemc.myresults || {};
		ch.gemc.myresults.results						= ch.gemc.myresults.results || {};
		ch.gemc.myresults.results.resumeTableClasses	= ch.gemc.myresults.results.resumeTableClasses || {};


ch.gemc.myresults.results.resumeTableClasses.TableCell.POS = function (a, b, c, d, style, group, inherit)
{
	// Zim DUO..
	var duo;	if (duo = zob (ch.gemc.myresults.results.resumeTableClasses.TableCell.POS, arguments, null, this))	{return duo;}

	if (zot (a)) a = 100;	// a as width
	if (zot (b)) b = 40;	// b as height

	// constructor..
	this.Container_constructor (a, b, c, d, style, group, inherit);
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	this.name		= "TableCell.POS";
			
	this.setData = function (text)
	{
		this.label.text			= text != undefined? text: "?";
		this.label.centerReg	(this);
		this.label.center		(this);
		this.label.mov			(18);
		this.label.x			= Math.round (this.label.x);
		this.label.y			= Math.round (this.label.y);

		/*
		this.label.animate	({
							from		:true,
							props		:{alpha:0, scale:10},
							time		:500,
							ease		:'quadOut',
							wait		:Math.random () * 500,
							})
		*/
	}




// ----------------------------------------------------------------------------------------
	this.bg	= new zim.Rectangle (this.width, this.height, zim.white).addTo (this);
	
	this.label	= new zim.Label ({
								text				:"Cell",
								size				:110,
//								font				:"Helvetica Neue",
								font				:"Roboto",
								fontOptions			:"bold",
//								color				:zim.red,
								color				:'red',
								rollColor			:zim.red,

								outlineColor		:zim.black,
								outlineWidth		:15,
							//	paddingHorizontal	:100,
								});
	this.label.center	(this);
	this.label.x		= Math.round (this.label.x);
	this.label.y		= Math.round (this.label.y);

	// clipping..
	var shape						= new Shape ();
		shape.graphics.beginFill	('red').drawRect (0, 0, this.width, this.height);
	this.label.mask = shape;
}

zim.extend (ch.gemc.myresults.results.resumeTableClasses.TableCell.POS, zim.Container, null, "Container");
