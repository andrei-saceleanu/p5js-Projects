class Target{
	constructor(t){
		if(t===undefined){
			this.r = 100;
			this.pos = createVector(width+200,random(this.r,height-this.r));
		}else{
			this.r = t.r;
			this.pos = t.pos.copy();
		}
	}


	update(){
		this.pos.x -= 1;
	}

	show(){
		circle(this.pos.x,this.pos.y,this.r);
	}
}