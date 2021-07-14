

let width = 600;
let height = 600;
let arrow;
let cnt = 0;
let targets_buffer = [];
let q= []

function setup(){
	createCanvas(width,height);
	arrow = new Arrow();
	for(let i = 0;i<10;i++){
		targets_buffer.push(new Target());
	}
	let c = new Target(targets_buffer[0]);
	q.push(c);
	targets_buffer.splice(0,1);
}

function mouseClicked(){
	if(!arrow.moving){
		arrow.v = arrow.dir.copy();
		arrow.v.setMag(20);
		arrow.moving = true;
	}
}

function draw(){
	background(0);
	stroke(255);
	ellipse(0,height/2,50,100);
	for(let t of q){
		t.update();
		t.show();
	}
	if(q[0].pos.x<-q[0].r){
		targets_buffer.push(new Target(q[0]));
		q.splice(0,1);
	}
	if(q[q.length-1].pos.x<width/2){
		q.push(new Target(targets_buffer[0]));
		targets_buffer.splice(0,1);
	}
	if(arrow.moving){
		arrow.update();
		if(arrow.outofsight())
			arrow = new Arrow();
	}
	arrow.show();
}