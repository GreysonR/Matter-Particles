/*MIT License

Copyright (c) 2019 Greyson Rockwell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
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

var vw = window.innerWidth/100;
var vh = window.innerHeight/100;

var numParticles = 0;
var particlesAdded = 0;
class Particle {
	defaults = {
		colors: ["#FE601C","#EBDB14","#EB471F","#ED7A0E"],
		collisions: false,
		isStatic: false,
		x: window.innerWidth/2,
		y: window.innerHeight/2,
		size: {
			min: 0.5,
			max: 2
		},
		amount: 50,
		interval: 0,
		velocity: {
			x:5,
			y:5,
			direction: {
				x: "none",
				y: "none"
			},
		},
		delay: 400,
		frictionAir: 0.02,
		parent: undefined,
		collisionFilter: undefined,
	};
	engine = {
		defaults: {
			canvas: undefined,
			width: window.innerWidth,
			height: window.innerHeight,
			background: "transparent",
			wireframes: false,
			showBroadphase: false,
		},
		create() {
			// create an engine
			window["engine"] = Engine.create(),
			window["world"] = engine.world;
			engine.timing.timeScale = 1;

			// create a renderer
			let defaults = new Particle;
			defaults = defaults.engine.defaults;
			if (defaults.canvas == undefined) {
				window["render"] = Render.create({
					element: document.body,
					engine: engine,
					options: {
						width: defaults.width,
						height: defaults.height,
						background: defaults.background,
						wireframes: defaults.wireframes,
						showBroadphase: defaults.broadphase,
					}
				});
			}
			else {
				window["render"] = Render.create({
					canvas: defaults.canvas,
					engine: engine,
					options: {
						width: defaults.width,
						height: defaults.height,
						background: defaults.background,
						wireframes: defaults.wireframes,
						showBroadphase: defaults.broadphase,
					}
				});
			}
			engine.world.gravity.y = 0;
			Render.run(render);
			
			// create runner
			window["runner"] = Runner.create();
			Runner.run(runner, engine);
		},
		createMouse() {
			window["mouse"] = Mouse.create(render.canvas),
			window["mouseConstraint"] = MouseConstraint.create(engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.1,
					render: {
						visible: false
					}
				}
			});
		
			World.add(world, mouseConstraint);
			render.mouse = mouse;
		}
	};
	emitter = {
		random(min, max) {
			if (min == undefined && max == undefined) {
				min = 0;
				max = 1;
			}
			else if (max == undefined) {
				max = min;
				min = 0;
			}

			return (Math.random() * (max-min)) + min;
		},
		create(x, y, options) {
			let pr = new Particle;
			let defaults = pr.defaults;
			//Reset options to defaults
			if (options == undefined) {
				options = defaults;
			}
			if (options.collisions == undefined) {
				options.collisions = defaults.collisions;
			}
			if (options.isStatic == undefined) {
				options.isStatic = defaults.isStatic;
			}
			if (options.size == undefined) {
				options.size = defaults.size;
			}
			else if (typeof options.size == "number") {
				options.size = {
					min: options.size,
					max: options.size
				};
			}
			if (options.amount == undefined) {
				options.amount = defaults.amount;
			}
			if (options.interval == undefined) {
				options.interval = defaults.interval;
			}
			if (options.velocity == undefined) {
				options.velocity = defaults.velocity;
			}
			if (options.velocity.direction == undefined) {
				options.velocity.direction = defaults.velocity.direction;
			}
			else if (options.velocity.direction.x == undefined) {
				options.velocity.direction.x = defaults.velocity.direction.x;
			}
			else if (options.velocity.direction.y == undefined) {
				options.velocity.direction.y = defaults.velocity.direction.y;
			}
			if (options.colors == undefined) {
				options.colors = defaults.colors;
			}
			else if (typeof options.colors == "string") {
				options.colors = [options.colors];
			}
			if (options.delay == undefined) {
				options.delay = defaults.delay;
			}
			if (options.frictionAir == undefined) {
				options.frictionAir = defaults.frictionAir;
			}
			if (options.parent == undefined) {
				options.parent = defaults.parent;
			}
			if (options.collisionFilter == undefined) {
				options.collisionFilter = defaults.collisionFilter;
			}


			options.collisions = options.collisions ? false : true;

			//Reset x/y to defaults
			if (x == undefined) {
				x = defaults.x;
			}
			if (y == undefined) {
				y = defaults.y;
			}

			//Change velocity.direction
			let dir = options.velocity.direction;
			dir.y = dir.y.toLowerCase();
			dir.x = dir.x.toLowerCase();
			if (dir.y == "up") {
				options.velocity.direction.y = -1;
			}
			else if (dir.y == "down") {
				options.velocity.direction.y = 1;
			}
			else if (dir.y == "none") {
				options.velocity.direction.y = 0;
			}
			
			if (dir.x == "left") {
				options.velocity.direction.x = -1;
			}
			else if (dir.x == "right") {
				options.velocity.direction.x = 1;
			}
			else if (dir.x == "none") {
				options.velocity.direction.x = 0;
			}


			//Create final emitter
			let finalEmitter = {
				pos: {x:x,y:y},
				options: options,
				running: false,
			};
			
			//Add stop function
			finalEmitter.stop = function() {
				let e = this;
				let amount = this.options.amount;
				this.options.amount = 0;
				requestAnimationFrame(function() {
					requestAnimationFrame(function() {
						e.options.amount = amount;
					});
				});
			}
			finalEmitter.start = function() {
				let localParticleEmitter = new Particle;
				localParticleEmitter.emitter.explode(this);
			}
			finalEmitter.explode = finalEmitter.start;

			//Return final emitter
			return finalEmitter;
		},
		explode(emitter) {
			var random = new Particle
			random = random.emitter.random;
			particlesAdded = 0;
			
			function addParticle() {
				let pos = emitter.pos;
				let pSize = emitter.options.size;
				let colors = emitter.options.colors;
				let vel = emitter.options.velocity;
				let number = emitter.options.amount;
				let interval = emitter.options.interval;
				let interactive = emitter.options.collisions;
				let frictionAir = emitter.options.frictionAir;
				let direction = emitter.options.velocity.direction;
				let collisionFilter = emitter.options.collisionFilter;
			
			
				numParticles++;
				particlesAdded++;
			
				if (emitter.options.parent != undefined) {
					emitter.pos = emitter.options.parent.position;
					pos = emitter.options.parent.position;
				}
			
				let name = "particle"+numParticles;
				let size = random(pSize.min, pSize.max);
				let color = colors[Math.round(random(colors.length))];
				color = (color != undefined) ? color : colors[0];
			
				window[name] = Bodies.circle(pos.x, pos.y, size, {
					isSensor: interactive,
					isParticle: true,
					isStatic: emitter.options.isStatic,
					mass: 0,
					frictionAir: frictionAir,
					render: {
						fillStyle: color
					},
				});
				World.add(world, window[name]);

				if (collisionFilter != undefined) {
					window[name].collisionFilter = collisionFilter;
				}
			
				let velX = random(0, vel.x);
				let velY = random(0, vel.y);
			
				if (vel.y == undefined) {
					velY = random(0, 2);
				}
				if (vel.x == undefined) {
					velX = random(0, 2);
				}
			
				if (direction.x == undefined || direction.x == 0) {
					velX = (Boolean(Math.round(random()))) ? velX : velX*-1;
				}
				else {
					velX *= direction.x;
				}
			
				if (direction.y == undefined || direction.y == 0) {
					velY = (Boolean(Math.round(random()))) ? velY : velY*-1;
				}
				else {
					velY *= direction.y;
				}
				let velocity = {x:velX,y:velY};
				Body.setVelocity(window[name], velocity);
				setTimeout(function() {
					function decreaseScale() {
						Body.scale(window[name], 0.9, 0.9);
						if (window[name].circleRadius > 0.1) {
							requestAnimationFrame(decreaseScale);
						}
						else {
							Composite.remove(world, window[name]);
						}
					}
					decreaseScale();
				}, emitter.options.delay);
			
				if (particlesAdded < number) {
					if (interval > 0) {
						setTimeout(addParticle, interval);
					}
					else {
						addParticle();
					}
				}
			}
			addParticle();
		},
	}
}