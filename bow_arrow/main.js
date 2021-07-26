

let width = 1200;
let height = 800;
let arrow;
let cnt = 0;
let targets_buffer = [];
let q = [];
let arrow_hold = 0;
let cannon_pos = height/2;

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
		if(arrow_hold>200)
			arrow_hold = 200;
		let m = map(arrow_hold,0,200,20,40);
		arrow.v.setMag(m);
		arrow_hold=0;
		arrow.moving = true;
	}
}


function draw(){
	background(0);
	stroke(255);
	if(keyIsDown(UP_ARROW)){
		cannon_pos -= 5;
		if(cannon_pos<50)
			cannon_pos = 50;
		if(!arrow.moving)
			arrow.pos.y = cannon_pos;
	}
	if(keyIsDown(DOWN_ARROW)){
		cannon_pos += 5;
		if(cannon_pos>height-50)
			cannon_pos = height-50;
		if(!arrow.moving)
			arrow.pos.y = cannon_pos;
	}
	ellipse(0,cannon_pos,50,100);
	if(arrow.moving){
		arrow.update();
		if(arrow.outofsight())
			arrow = new Arrow();
		if(arrow.hit(q)){
			cnt +=1;
			arrow = new Arrow();
			if(q.length==0){
				q.push(new Target(targets_buffer[0]));
				targets_buffer.splice(0,1);
			}
		}
	}
	arrow.show();
	for(let t of q){
		t.update(arrow.pos,arrow.dir);
		t.edges();
		t.show();
	}
	if(targets_buffer.length==0)
		targets_buffer.push(new Target())
	if(q.length>=1 && q[0].pos.x<-q[0].r){
		targets_buffer.push(new Target());
		q.splice(0,1);
	}
	if(q.length>=1 && q[0].pos.x>1.3*width){
		targets_buffer.push(new Target());
		q.splice(0,1);
	}
	if(q.length==0 || (q.length>=1 && q[q.length-1].pos.x<width/2)){
		q.push(new Target(targets_buffer[0]));
		targets_buffer.splice(0,1);
	}	
	fill(255);
	textSize(30);
	text(cnt, 10, 10, 200,200);	
	if(mouseIsPressed)
		arrow_hold+=1;
	// console.log(q.length);
	// console.log(targets_buffer.length);
}