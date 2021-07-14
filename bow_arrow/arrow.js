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

	outofsight(){
		if(this.pos.x>width||this.pos.y>height)
			return true;
		return false;
	}

	show(){
		if(!this.moving){
			let t = createVector(mouseX,mouseY);
			t.sub(this.pos);
			t.setMag(this.len);
			this.dir = t.copy();
			stroke(255);
			strokeWeight(4);
			line(this.pos.x,this.pos.y,this.pos.x+t.x,this.pos.y+t.y);
		}else{
			stroke(255);
			strokeWeight(4);
			line(this.pos.x,this.pos.y,this.pos.x+this.dir.x,this.pos.y+this.dir.y);
			this.dir.y += 4;
			this.dir.setMag(this.len);
		}
	}
}