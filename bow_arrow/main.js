

let width = 600;
let height = 600;
let arrow;

function setup(){
	createCanvas(width,height);
	background(0);
	arrow = new Arrow();
}

function mouseClicked(){
	if(!arrow.moving){
		arrow.v = arrow.dir.copy();
		arrow.v.setMag(1);
		arrow.v.mult(20);
		arrow.moving = true;
		arrow.update();
	}
}

function draw(){
	
	stroke(255);
	ellipse(0,height/2,50,100);
	if(arrow.moving)
		arrow.update();
	arrow.show();
}