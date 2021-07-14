class Arrow{
	constructor(){
		this.pos = createVector(0,height/2);
		this.len = 100;
		this.v = createVector(0,0);
		this.moving = false;
		this.dir = createVector(0,0);
	}


	update(){
		this.v.add(createVector(0,1));
		this.pos.add(this.v);
	}

	show(){
		let t = createVector(mouseX,mouseY);
		t.sub(this.pos);
		t.setMag(this.len);
		this.dir = t.copy();
		stroke(255);
		strokeWeight(4);
		push();
		translate(this.pos.x,this.pos.y);
		line(0,0,t.x,t.y);
		pop();
	}
}