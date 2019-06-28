var Particles = new Particle;
var Emitter = Particles.emitter;
Particles.engine.create();
var emitter = Emitter.create(window.innerWidth/2, window.innerHeight/2);

var running = false;
function restartSim() {
	if (running == false) {

		emitter.explode();

		//Used for sim
		running = true;
		setTimeout(function() {
			running = false;
		}, 400);
	}
}
window.addEventListener("load", restartSim);

var button = document.getElementById("rsButton");
button.addEventListener("click", function() {
	restartSim();
});