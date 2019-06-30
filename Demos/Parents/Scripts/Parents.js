//Usage
var Emitter = Particle.emitter;
Particle.engine.create();
Particle.engine.createMouse();

mouseConstraint.collisionFilter = {group:1};
engine.world.gravity.y = 2;

var timesRun = 0;
function restartSim() {
	if (timesRun > 0) {
		window["emitter"].stop();
		Composite.remove(world, [floor1,floor2,ball]);
	}
	timesRun++;

	window["floor1"] = Bodies.rectangle(vw*50, vh*80, vw*30, vh*40, {
		isStatic: true,
		render: {
			fillStyle: "white",
		},
		collisionFilter: {
			group: 1,
			mask: 0x002,
			category: 0x002,
		},
	});
	window["floor2"] = Bodies.rectangle(vw*50, vh*100, vw*100, vh*10, {
		isStatic: true,
		render: {
			fillStyle: "white",
		},
		collisionFilter: {
			group: 1,
			mask: 0x002,
			category: 0x002,
		},
	});
	window["ball"] = Bodies.circle(vw*50, vh*30, vw*1.2, {
		restitution: 0.5,
		render: {
			fillStyle: "#1293D4"
		},
		collisionFilter: {
			group: 1,
			category: 0x004,
			mask: 0x004,
		},
	});
	World.add(world, [floor2, floor1, ball]);

	window["emitter"] = Emitter.create(vw*50, vh*50, {
		collisions: true,
		size: {
			min: 0.1,
			max: 1
		},
		amount: Infinity,
		interval: 5,
		frictionAir: 0.1,
		isStatic: false,
		delay: 400,
		colors: ["#15D3EE","#0E8AF7","#0452CA"],
		velocity: {
			x: 20,
			y: 20,
		},
		collisionFilter: {
			mask: 0x002,
			category: 0x002,
		},
		parent: ball
	});
	emitter.explode();
}
window.addEventListener("load", restartSim);

var button = document.getElementById("rsButton");
button.addEventListener("click", restartSim);