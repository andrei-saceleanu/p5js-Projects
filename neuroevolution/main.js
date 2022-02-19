

let width = 600;
let height = 600;
let target;
let pop_size = 10;
let rockets = [];
let f = 0;
function setup(){
	createCanvas(width,height);
	target = createVector(width/2,height/6);
	for(let i = 0;i < pop_size; i++){
		rockets[i] = new Rocket();
	}
}

function draw(){
	background(0);
	stroke(255);
	strokeWeight(4);
	circle(target.x,target.y,20);
	if(f<600){
		for(let r of rockets){
			r.update(f);
			r.edges();
			r.show();
		}
	}	
	f += 1;
}