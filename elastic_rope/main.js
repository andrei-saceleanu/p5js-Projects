

let width = 600;
let height = 600;
let particles = [];
let springs = [];
let no_particles = 30;
let tail;
let omega = 30;
let t = 0;
let viscosity = 0.02;
function setup(){
	createCanvas(width,height);
	for(let i=0;i<no_particles;i++){
		particles.push(new Particle(width/2,1*i));
	}
	particles[0].locked = true;
	for(let i=0;i<particles.length-1;i++){
		springs.push(new Spring(particles[i],particles[i+1],0.1,1));
	}
	tail = particles[particles.length-1]; 
	// tail.locked = true;
	// tail.pos.x = width/2;
	// tail.pos.y = 2*height/3;
}

function mouseReleased(){
	particles[particles.length-1].v = createVector(mouseX-pmouseX,mouseY-pmouseY);
}

function draw(){
	background(0);
	if(mouseIsPressed){
		particles[particles.length-1].pos = createVector(mouseX,mouseY);
		particles[particles.length-1].v = createVector(0,0);
	}	
	// tail.pos.x = width/2 + 100*sin(omega*t);
	// t+=0.01;
	for(let i=0;i<springs.length;i++){
		springs[i].update();
		springs[i].show();
	}
	for(let i=0;i<particles.length;i++){
		particles[i].applyForce(createVector(0,0.1));
		particles[i].air(viscosity);
		particles[i].update();
		//particles[i].show();
	}
}