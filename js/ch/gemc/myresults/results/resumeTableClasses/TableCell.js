/*

ResumeTable Cell.

*/

'use strict';

window.	ch												= window.ch || {};
		ch.gemc											= ch.gemc || {};
		ch.gemc.myresults								= ch.gemc.myresults || {};
		ch.gemc.myresults.results						= ch.gemc.myresults.results || {};
		ch.gemc.myresults.results.resumeTableClasses	= ch.gemc.myresults.results.resumeTableClasses || {};


ch.gemc.myresults.results.resumeTableClasses.TableCell = function (a, b, c, d, style, group, inherit)
{
	// Zim DUO..
	var duo;	if (duo = zob (ch.gemc.myresults.results.resumeTableClasses.TableCell, arguments, null, this))	{return duo;}

	if (zot (a)) a = 100;	// a as width
	if (zot (b)) b = 40;	// b as height

	// constructor..
	this.Container_constructor (a, b, c, d, style, group, inherit);
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	this.name		= "TableCell";
			
	this.setData = function (text)
	{
		this.label.text			= text != undefined? text: "?";
//		this.label.label.font	= fontOptions + " 14px Helvetica Neue";
//		this.label.text = this.label.text;
//this.label.cache ();	// BAD
		this.label.center	(this);
		this.label.x		= Math.round (this.label.x);
		this.label.y		= Math.round (this.label.y);

		this.label.animate	({
							from		:true,
							props		:{alpha:0},
						//	props		:{alpha:0, y:-40},
							time		:1500,
							ease		:'quadOut',
							wait		:1000 + Math.random () * 500,
							})
	}




// ----------------------------------------------------------------------------------------
	this.bg	= new zim.Rectangle (this.width, this.height, zim.black).addTo (this);
	
	this.label	= new zim.Label ({
								text				:"Cell",
								size				:34,
//								font				:"Helvetica Neue",
								font				:"fontLCD",
							//	fontOptions			:"bold",
								color				:zim.white,
								rollColor			:zim.red,
							//	backgroundColor		:zim.white,
							//	padding				:40,
							//	paddingHorizontal	:100,
								});
	this.label.center	(this);
	this.label.x		= Math.round (this.label.x);
	this.label.y		= Math.round (this.label.y);
							
	// try shadow REF..
	/*
	this.labelBG		= this.label.clone ();
	this.labelBG.text	= "88:88:88";
	this.labelBG.color	= 'rgba(255,255,255,0.4)';
//	this.labelBG.addTo	(this);
	this.labelBG.loc	({target:this.label, container:this, add:true, localToLocal:true});
	*/

	// clipping..
	var shape						= new Shape ();
		shape.graphics.beginFill	('red').drawRect (0, 0, this.width, this.height);
	this.label.mask = shape;
}

zim.extend (ch.gemc.myresults.results.resumeTableClasses.TableCell, zim.Container, null, "Container");
