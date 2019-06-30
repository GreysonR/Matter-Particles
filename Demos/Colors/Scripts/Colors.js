var Emitter = Particle.emitter;
Particle.engine.create();

var red = Emitter.create(window.innerWidth*0.25, window.innerHeight/2, {
	colors: "red",
	amount: 40
});
var green = Emitter.create(window.innerWidth*0.5, window.innerHeight/2, {
	colors: "green",
	amount: 40
});
var blue = Emitter.create(window.innerWidth*0.75, window.innerHeight/2, {
	colors: "blue",
	amount: 40
});

var simRunning = false;
function restartSim() {
	if (simRunning == false) {
		simRunning = true;
		red.explode();
		setTimeout(function() {
			green.explode();
		}, 250);
		setTimeout(function() {
			blue.explode();
		}, 500);

		setTimeout(function() {
			simRunning = false;
		}, 700);
	}
}
window.addEventListener("load", restartSim);

var button = document.getElementById("rsButton");
button.addEventListener("click", function() {
	restartSim();
});