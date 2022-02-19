class Particle{
	constructor(x,y){
		this.pos = createVector(x,y);
		this.prev_pos = this.pos.copy();
		this.v = createVector(0,0);
		this.prev_v = createVector(0,0);
		this.acc = createVector(0,0);
		this.locked = false;
	}

	applyForce(force){
		this.acc.add(force);
	}

	air(viscosity){
		let mag = -viscosity*this.v.mag();
		let v = this.v.copy();
		v.setMag(1);
		this.applyForce(v.mult(mag));
	}

	update(t){
		if(!this.locked){
			this.prev_v = this.v.copy();
			this.prev_pos = this.pos.copy();
			this.v.add(this.acc);
			this.pos.add(this.v);
			this.acc.mult(0);
		}
	}
	update_verlet(t){
		if(!this.locked){
			let temp = this.pos.copy();
			let x = this.pos.copy();
			x.mult(2);
			let y = this.prev_pos.copy();
			y.mult(1);
			let d = p5.Vector.sub(x,y);
			let a = this.acc.copy();
			this.pos = p5.Vector.add(d,a);
			this.prev_pos = temp;
			this.v = p5.Vector.sub(this.pos,this.prev_pos);
			this.acc.mult(0);
		}	
	}

	show(){
		stroke(255,0,0);
		strokeWeight(3);
		ellipse(this.pos.x,this.pos.y,4,4);
	}
}