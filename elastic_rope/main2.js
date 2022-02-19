


let width = 800;
let height = 800;
let particles = [];
let springs = [];
let no_particles = 100;
let viscosity = 0.02;
let offset = 150;
let obstacles = [];
let kSlider,viscSlider;
let par1,par2;
let step = 3.0;
let desired_d = 3.5;
let tail;
let checkBox,checkBox2;
let show,euler;

function setup(){
	createCanvas(width,height);
	rectMode(CENTER);
	kSlider = createSlider(0,10,0.1,0.01);
	viscSlider = createSlider(0,1,0.02,0.01);
	par1 = createP('Elastic constant: '+kSlider.value()); 
	par2 = createP('Medium viscosity: '+viscSlider.value()); 
	checkBox = createCheckbox('Show particles',false);
	show = 0;
	checkBox.changed(chEvent);
	checkBox2 = createCheckbox('Euler',false);
	euler = 0;
	checkBox2.changed(chEvent2);
	


	for(let i=0;i<no_particles;i++){
		particles.push(new Particle(offset+step*i,height/2));
	}
	for(let i=0;i<particles.length-1;i++){
		springs.push(new Spring(particles[i],particles[i+1],kSlider.value(),step));
	}
	kSlider.input(updateVal);
	viscSlider.input(updateVal2);
	obstacles.push(new ObstacleC(width/2,3*height/4,100,createVector(50,200,10)));
	obstacles.push(new ObstacleC(500,100,50,createVector(10,20,200)));
	obstacles.push(new ObstacleC(100,200,75,createVector(200,40,200)));
	obstacles.push(new ObstacleR(600,400,200,100,0.75));
	
}


function chEvent(){
	if(this.checked()){
		show = 1;
	}else{
		show = 0;
	}
}

function chEvent2(){
	if(this.checked()){
		euler = 1;
	}else{
		euler = 0;
	}
}
function updateVal(){
	par1.html('Elastic constant: '+kSlider.value());
}

function updateVal2(){
	par2.html('Medium viscosity: '+viscSlider.value());
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
function keyTyped(){
	if(key === 'a'){
		console.log(viscosity);
	}
}

function draw(){
	background(0);
	viscosity = viscSlider.value();
	if(mouseIsPressed && mouseX<=width && mouseY<=height){
		particles[particles.length-1].pos = createVector(mouseX,mouseY);
		particles[particles.length-1].v = createVector(0,0);
	}	
	for(let i=0;i<springs.length;i++){
		springs[i].k = kSlider.value();
		springs[i].update();
		springs[i].show();
	}
	for(let i=0;i<particles.length;i++){
		particles[i].applyForce(createVector(0,0.05));
		particles[i].air(viscosity);
		for(let obs of obstacles){
			if(obs.intersect(particles[i],5)){
				let v = p5.Vector.sub(particles[i].pos,obs.pos);
				if(obs instanceof ObstacleC){
					v.setMag(5+obs.r);
					particles[i].pos = p5.Vector.add(obs.pos,v);
					particles[i].v = createVector(0,0);
				}else{
					new_pos = obs.projections(particles[i]);
					particles[i].pos = new_pos;
					particles[i].v = createVector(0,0);
				}
				
			}
		}
		if(euler){
			particles[i].update(deltaTime);
		}else{
			particles[i].update_verlet(deltaTime);	
		}
	}
	for(let k = 0;k<5;k++){
		for(let i=0;i<particles.length;i++){
			if(i<particles.length-1){
				let dir = p5.Vector.sub(particles[i+1].pos,particles[i].pos);
				let d = dir.mag();
				dir.setMag(1);
				let delta_d = d - desired_d;
				dir.mult(delta_d/2);
				particles[i].pos.add(dir);
				dir.mult(-1);
				particles[i+1].pos.add(dir);
			}
		}
	}
	if(show){
		for(let i=0;i<particles.length;i++){
			particles[i].show();
		}
	}
	for(let obs of obstacles){
		obs.show();
	}
}