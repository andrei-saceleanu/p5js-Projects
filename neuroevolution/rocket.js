class Rocket{
	constructor(){
		this.pos = createVector(width/2,height);
		this.vel = createVector(random(-2,2),random(-1.5,-1));
		this.acc = createVector(0,0);
		this.dna = [];
		for(let i = 0;i<600;i++){
			this.dna[i] = floor(random(0,5));
		}
	}

	update(f){
		let d = this.dna[f];
		this.acc = this.vel.copy();
		if(d==0){
			this.acc.rotate(0);
		}else if(d==1){
			this.acc.rotate(HALF_PI/2);
		}else if(d==2){
			this.acc.rotate(-HALF_PI/2);
		}else if(d==3){
			this.acc.rotate(0.1);
		}else if(d==4){
			this.acc.rotate(-0.1);
		}
		this.acc.add(createVector(0,1));
		this.vel.add(this.acc);
		this.vel.limit(10);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	edges(){
		if(this.pos.y+5>height)
			this.vel.y *= (-1);
		if(this.pos.y-5<0)
			this.vel.y *= (-1);
		if(this.pos.x+5>width)
			this.vel.x *= (-1);
		if(this.pos.x-5<0)
			this.vel.x *= (-1);
	}

	show(){
		stroke(255);
		strokeWeight(4);
		circle(this.pos.x,this.pos.y,10);
	}
}