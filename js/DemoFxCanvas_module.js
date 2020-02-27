'use strict';

var Application = Application || {};

// voir: https://zestedesavoir.com/tutoriels/358/module-pattern-en-javascript/

Application.DemoFxCanvas = (function (self)
{

//	=== P U B L I C ========================================================================================

	/**
	 * Duration in milli seconds
	 */
	self.fadeIn = function (duration)
	{
		// activate tick..
		createjs.Ticker.addEventListener ('tick', tickHandler);

		createjs.Tween	.get				(stage, { loop:false, override:true })
						.to					({ alpha:1.0 }, duration, createjs.Ease.getPowInOut(2))
						.call				(function ()
											{
											})
						.addEventListener	('change', function ()
											{
											})
						;
	};

	self.fadeOut = function (duration)
	{
		createjs.Tween	.get				(stage, { loop:false, override:true })
						.to					({ alpha:0.0 }, duration, createjs.Ease.getPowInOut(2))
						.call				(function ()
											{
												// desactivate tick..
												createjs.Ticker.removeEventListener ('tick', tickHandler);
											})
						.addEventListener	('change', function ()
											{
											})
						;
	};

	/**
	 * Targeting the HTMLElement.
	 */
	self.setTargetId = function (id)
	{
		if (document.getElementById (id) == _target && _target != null)
		return;

		_target = document.getElementById (id);
		
		if (_target)	_init ();
	};

	
//	=== P R I V A T E ======================================================================================
	
	var _target;	// HTMLElement
	var stage;		// createjs.StageGL

	// TODO: only once on tick..
	function _invalidate (flag)
	{
		switch (flag)
		{
			case 'invalidateData':
			//	zog ("invalidate Data..");
				break;

			case 'invalidateSize':
			case 'invalidateLayout':
			//	zog ("invalidate Layout..");
				// vars..
				ratio = stage.canvas.width / stage.canvas.height;
				//baseTime = ratio;
				center.set (stage.canvas.width / 2, stage.canvas.height / 2);
				beamWidth = stage.canvas.width * 1.2;
				for (let i = 0; i < beamInstances.length; i++)
				{
					beamInstances [i].width = beamWidth;
				}
				//Beam.globalTimeScalar = canvasWidth/canvasHeight;
				break;
		}
	}

	function _init ()
	{
		if (stage)
		return;
		
		stage					= new createjs.StageGL (_target.id, {preserveBuffer:false, antialias:false, transparent:true});
		stage.enableDOMEvents	(true);
		stage.tickChildren		= false;
		stage.tickEnabled		= false;
		stage.tickOnUpdate		= false;
		stage.alpha				= 0;

		createjs.Ticker.timingMode	= createjs.Ticker.RAF;

		_target.style.display	= "block";

		window.onresize = windowResizeHandler;
		windowResizeHandler ();
	}
		
		
		
		














		
		
		
// ==================================================================================================		



	var baseTime			= 1;
	var globalTimeScalar	= 1.5;
		globalTimeScalar	= .5;
//		globalTimeScalar	= 5;
	var timeDelta			= 0;
		timeDelta			= 10;
	var globalParticleCount;
	
	var canvasWidth		= window.innerWidth;
	var canvasHeight	= window.innerHeight;

	var ratio			= canvasWidth / canvasHeight;
	var center			= new Vexr.Vector3 (canvasWidth / 2, canvasHeight / 2);
	var mouse			= new Vexr.Vector3 (window.innerWidth / 2, window.innerHeight / 2, 0);

	var addBeams		= false;

	var beamWidth		= canvasWidth * 1.2;

	var spriteSheet;

	var queue				= new createjs.LoadQueue ();
		queue.on			('complete', assetsLoadedHandler);
		queue.loadManifest	([
								{src: "./assets/dot.png", id: 'gfx'}
							]);


	var beamInstances	= [];		// !..


































// Functions :
// ==================================================================================================		

function assetsLoadedHandler ()
{
	var data = {
		images: ["./assets/dot.png"],
		frames: [
			// x, y, width, height, imageIndex*, regX*, regY*
			[0, 0, 128, 128, 0, 64, 64]
		],
		animations: {
			dot: 0
		}
	};

	spriteSheet = new createjs.SpriteSheet (data);

	createBeams ();
}

function createBeams ()
{
	var particleSprite = new createjs.Sprite (spriteSheet, "dot");

	new BeamGroup (2000, 0.7, beamWidth, canvasHeight / 3, 0, 0.3, particleSprite, beamInstances);
	new BeamGroup (2000, 0.8, beamWidth, canvasHeight / 2.5, canvasWidth / 2, 0.2, particleSprite, beamInstances);
	new BeamGroup (250, 0.65, beamWidth, canvasHeight / 4, canvasWidth, 0.1, particleSprite, beamInstances);
	
	var beams = [
		{
			density: 300,
			scatter: 600,
			width: beamWidth,
			height: canvasHeight / 2,
			particleOpacity: .08,
			particleScale: 1.5,
			timeRate: .4,
			rotateSpeed: 0.3,
			parallax: 0.1,
			phase: canvasWidth / 2,
			y: -canvasHeight / 5
		}, {
			density: 300,
			scatter: 450,
			width: beamWidth,
			height: canvasHeight / 1.5,
			particleOpacity: .05,
			particleScale: 2.5,
			timeRate: 0.5,
			rotateSpeed: 0.2,
			parallax: .05,
			phase: canvasWidth / 4,
			y: (canvasHeight / 5) * 2
		}
	];

	for (let i = 0; i < beams.length; i++)
	{
		let beam = new Beam (beams [i], particleSprite);
		beamInstances.push (beam);
		stage.addChild (beam);
	}

}

function windowResizeHandler ()
{
//	zog (window.innerWidth + " x " + window.innerHeight);

	canvasWidth		= window.innerWidth;
	canvasHeight	= window.innerHeight;

	// update the Canvas size..
	stage.canvas.width		= window.innerWidth;
	stage.canvas.height		= window.innerHeight;
	
	// update the WebGL viewport..	(the render surface's)
	stage.updateViewport	(stage.canvas.width, stage.canvas.height);

	// ..
	_invalidate ('invalidateLayout');
}

function tickHandler ()
{
//	zog ("tickHandler..");

	// update all beams..
	var start	= performance.now ();
	var p		= Vexr.Vector3.multiply (mouse, 0.5);
	var loc		= Vexr.Vector3.add (p, center, p);
	for (let i = 0; i < beamInstances.length; i++)
	{
		let beam = beamInstances [i];
		beam.trackingPoint = Vexr.Vector3.add (Vexr.Vector3.multiply (mouse, beam.parallax), center, loc);
		beam.update ();
	}

	stage.update ();
	Beam.timeDelta = performance.now () - start;
}

// ==================================================================================================		
	
		
		
		


































// Classes :
// ==================================================================================================		


/**
 * Beam Classes
 *
 */

class Beam extends createjs.Container {

	static get globalTimeScalar() {
		return globalTimeScalar;
	}

	static set globalTimeScalar(value) {
		globalTimeScalar = value;
	}

	/*
	static get timeDelta() {
		return timeDelta;
	}

	static set timeDelta(value) {
		timeDelta = value;
	}
	*/

	static get timeDelta() {
		return globalParticleCount;
	}

	static set timeDelta(value) {
		globalParticleCount = value;
	}

	constructor(params, sprite = null) {
		super();
		this.phase = 0;
		this.timeRate = 1;
		this.time = 0;
		this.density = 100;
		this.width = window.innerWidth;
		this.height = 100;
		this.scatter = 50;
		this.particleOpacity = .6;
		this.particleScale = 0.1;
		this.trackingPoint = new Vexr.Vector3();
		this.rotateSpeed = 1;
		this.parallax = 0.1;
		this.seed = Math.random() * 3;
		Object.assign(this, params);

		this.points = [];
		this.zero = new Vexr.Vector3();
		if (sprite != null && sprite instanceof createjs.Sprite) {
			this.sprite = sprite.clone();
			this.createPoints();
		}
	}

	createPoints() {
		let amountOfDots = this.density;
		for (let i = 0; i < this.density; i++) {
			let scale = this.particleScale * Math.random();
			let c = {};
			c.location = new Vexr.Vector3();
			c.scatter = new Vexr.Vector3(Math.random() * this.scatter, Math.random() * this.period(amountOfDots) * this.scatter);
			c.scatter.rotate(Math.random() * 360);
			c.rotateDirection = ((Math.random() - 1) * 2) * this.rotateSpeed;
			c.scale = scale;
			c.graphic = this.sprite.clone();
			c.graphic.getBounds();
			c.graphic.regX = c.graphic.getBounds().width / 2 + (c.scatter.x * 1 / this.particleScale);
			c.graphic.regY = c.graphic.getBounds().height / 2 + (c.scatter.y * 1 / this.particleScale);
			c.graphic.alpha = Math.random() * this.particleOpacity;
			c.graphic.scaleX = scale;
			c.graphic.scaleY = scale;
			this.addChild(c.graphic);
			this.points.push(c);
		}
	}

	updatePoints() {
		let slice = this.width / this.points.length;
		for (let i = 0; i < this.points.length; i++) {

			let c = this.points[i];
			let locY = this.trackingPoint.y;
			let locX = (((this.trackingPoint.x + this.width) + (slice * i) + this.time + this.phase) % this.width) - 100;

			c.location.x = locX;
			c.location.y =
				this.wave(this.time, slice * i, this.width, locY, this.height) +
				this.wave(this.time * this.seed, slice * i, this.width / 2, 0, this.height / 4);
			c.graphic.alpha = this.particleOpacity + this.wave(this.time * this.seed, slice * i, this.width / 2, 0, this.particleOpacity);
			c.graphic.scaleX = c.graphic.scaleY = c.scale * (0.75 + this.wave(this.time * this.seed, slice * i, this.width / 2, 0, .25));
			c.graphic.rotation += c.rotateDirection;

			c.graphic.x = c.location.x;
			c.graphic.y = c.location.y;
		}
	}

	wave(time, phase, length, bias, amplitude) {
		amplitude *= 0.5;
		return bias + Math.cos((phase + time) * this.period(length) % 360) * amplitude;
	}

	period(length) {
		return 2 * Math.PI / length;
	}

	update() {
		this.time += (this.timeRate * Beam.globalTimeScalar);
		this.updatePoints();
	}
}






/**
 *
 * Creates a bunch of beams that all follow the same wave
 */

var beamgroups = [];

class BeamGroup
{
	static get beams() {
		return beamgroups;
	}

	constructor (density, scale, width, height, phase, parallax, sprite, collection)
	{
		var dist = density / 6;
		beamgroups.push (this);
		this.beamCollection = [];
		this.seed = Math.random() * 1.5;
		this.speed = 1 + Math.random();
		this.beams = [
			{
				density: Math.round(dist * 3),
				timeRate: this.speed,
				width: width,
				height: height,
				particleScale: scale / 10,
				particleOpacity: scale,
				parallax: parallax,
				phase: phase,
				seed: this.seed,
				rotateSpeed: this.seed
			},
			{
				density: Math.round(dist * 2),
				timeRate: this.speed*.8,
				width: width,
				height: height,
				scatter: 100,
				particleScale: scale / 5,
				particleOpacity: scale / 5,
				parallax: parallax,
				phase: phase,
				seed: this.seed,
				rotateSpeed: this.seed
			},
			{
				time: 30,
				density: Math.round(dist),
				timeRate: this.speed*.5,
				scatter: 25,
				width: width,
				height: height,
				particleOpacity: scale / 10,
				particleScale: scale - .2,
				parallax: parallax,
				phase: phase,
				seed: this.seed,
				rotateSpeed: this.seed
			}
		];
		for (let i = 0; i < this.beams.length; i++)
		{
			let beam = new Beam (this.beams[i], sprite);
			this.beamCollection.push (beam);
			collection.push (beam);
			stage.addChild(beam);
		}
	}
}


		
		
		
		
		
		
		
		


//	=== E N D ==============================================================================================

    return self;
}) (Application.DemoFxCanvas || {});
