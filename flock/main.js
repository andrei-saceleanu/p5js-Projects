

let width = 400;
let height = 400;
let predator;
let flock = [];

function setup(){
	createCanvas(width,height);
	for(let i = 0; i < 100 ; i++){
		flock[i] = new Boid();
	}
	predator = createVector();
}

function draw(){
	background(0);
	predator.x = mouseX;
	predator.y = mouseY;
	for(let i = 0; i < flock.length; i++){
		flock[i].force(flock,predator);
		flock[i].update();
		flock[i].edges();
		flock[i].show2();
	}
}