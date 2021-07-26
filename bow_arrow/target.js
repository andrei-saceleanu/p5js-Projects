class Target{
	constructor(t){
		if(t===undefined){
			this.r = random(50,150);
			this.pos = createVector(width+200,random(this.r,height-this.r));
			this.v = createVector(random(-2,-1),random(-3,3))
			this.v.setMag(random(2,4));
			this.avoid_flag = false;
			this.acc = createVector(0,0);
			let a = random(0,1);
			if(a<0.4)
				this.avoid_flag = true;
			
		}else{
			this.r = t.r;
			this.pos = t.pos.copy();
			this.v = t.v.copy();
			this.avoid_flag = t.avoid_flag;
			this.acc = t.acc.copy();
		}
	}


	update(pos,dir){
		if(this.avoid_flag){
			let x = pos.x + dir.x;
			let y = pos.y + dir.y;
			let desired = p5.Vector.sub(this.pos,createVector(x,y));
			if(desired.mag()<100){
				desired.limit(10);
				desired.sub(this.v);
				desired.limit(10);
				this.acc.add(desired);
				this.v.add(this.acc);
				this.acc.mult(0);
			}
		}
		this.pos.add(this.v);
	}

	edges(){
		if((this.pos.y-this.r<-this.r/2) || (this.pos.y+this.r>height+this.r/2)){
			this.v.y *=(-1);
		}
	}

	show(){
		circle(this.pos.x,this.pos.y,this.r);
	}
}