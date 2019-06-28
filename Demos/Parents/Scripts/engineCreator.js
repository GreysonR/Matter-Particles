//Basic variables
	var canv = document.getElementById("canv");
	var ctx = canv.getContext("2d");
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var vw = windowWidth/100;
	var vh = windowHeight/100;
	var body = document.getElementById("body");
	var html = document.getElementById("html");

//Create engine - All the game stuff
	var Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Composites = Matter.Composites,
	Composite = Matter.Composite,
	Common = Matter.Common,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Grid = Matter.Grid,
	MouseConstraint = Matter.MouseConstraint,
	Mouse = Matter.Mouse,
	Body = Matter.Body,
	Events = Matter.Events;

// create an engine
	var engine = Engine.create(),
	world = engine.world;
	engine.timing.timeScale = 1;

// create a renderer
	var render = Render.create({
		canvas: canv,
		engine: engine,
		options: {
			width: windowWidth,
			height: windowHeight,
			background: "transparent",//'#141414',
			wireframes: false,
			showBroadphase: false,
		}
	});
	engine.world.gravity.y = 2;
	window.onload = function() {
		Render.run(render);
	}

// create runner
	var runner = Runner.create();
	Runner.run(runner, engine);


	
// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
				visible: false,
			},
        },
		collisionFilter: {
			group: 1
		}
	});
	
World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;