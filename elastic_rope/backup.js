


let width = 600;
let height = 600;
let particles = [];
let springs = [];
let no_particles = 60;
let tail;
// let omega = 30;
// let t = 0;
let viscosity = 0.02;
let offset = 150;
let obs;
let normal = 10;
let obstacles = [];

function setup(){
	createCanvas(width,height);
	for(let i=0;i<no_particles;i++){
		particles.push(new Particle(offset+5*i,height/2));
	}
	for(let i=0;i<particles.length-1;i++){
		springs.push(new Spring(particles[i],particles[i+1],0.1,5));
	}
	obs = new ObstacleC(width/2,3*height/4,100);
	obstacles.push(new ObstacleC(width/2,3*height/4,100));
	obstacles.push(new ObstacleC(500,100,50));
	obstacles.push(new ObstacleC(100,200,75));
	
	// tail = particles[particles.length-1]; 
	// // tail.locked = true;
	// // tail.pos.x = width/2;
	// // tail.pos.y = 2*height/3;
}

function mouseReleased(){
	particles[particles.length-1].v = createVector(mouseX-pmouseX,mouseY-pmouseY);
}

function mouseClicked(){
	console.log(mouseX,mouseY);
}
function intersect(c1,r1,c2,r2){
	let d = p5.Vector.dist(c1,c2);
	return d<=r1+r2;
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
		particles[i].applyForce(createVector(0,0.05));
		particles[i].air(viscosity);
		// if(intersect(particles[i].pos,5,obs.pos,obs.r)){
		// 	let v = particles[i].acc.copy();
		// 	v.mult(-0.75);
		// 	particles[i].applyForce(v);
		// }
		// if(intersect(particles[i].pos,5,obs.pos,obs.r)){
		// 	let v = p5.Vector.sub(particles[i].pos,obs.pos);
		// 	v.setMag(6+obs.r);
		// 	particles[i].pos = p5.Vector.add(obs.pos,v);
		// 	// particles[i].v.mult(-1);
		// 	// particles[i].v.setMag(1.5);
		// }
		for(let obs of obstacles){
			if(obs.intersect(particles[i],5)){
				let v = p5.Vector.sub(particles[i].pos,obs.pos);
				v.setMag(5+obs.r);
				particles[i].pos = p5.Vector.add(obs.pos,v);
				particles[i].v = createVector(0,0);
				//particles[i].v.mult(-1);
				// particles[i].v.mult(-1);
				// particles[i].v.setMag(1.5);
			}
		}
		particles[i].update();
		// if(intersect(particles[i].pos,5,obs.pos,obs.r)){
		// 	particles[i].pos = particles[i].prev_pos.copy();
		// 	let v = p5.Vector.sub(particles[i].prev_pos,obs.pos);
		// 	v.setMag(0.5);
		// 	particles[i].pos.add(v);
		// 	particles[i].v = particles[i].prev_v.copy();
		// }
		// if(intersect(particles[i].pos,5,obs.pos,obs.r)){
		// 	let v = p5.Vector.sub(particles[i].pos,obs.pos);
		// 	let m = p5.Vector.dist(particles[i].v,particles[i].prev_v);
		// 	v.setMag(0.75*m);
		// 	particles[i].applyForce(v);
		// }

		//particles[i].show();
	}
	//console.log(intersect(particles[0].pos,5,obs.pos,obs.r));
	for(let obs of obstacles){
		obs.show();
	}
	//obs.show();
}