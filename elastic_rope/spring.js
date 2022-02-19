class Spring{
	constructor(a,b,k,l){
		this.a = a;
		this.b = b;
		this.k = k;
		this.restLength = l;
	}

	update(){
		let v = p5.Vector.sub(this.b.pos,this.a.pos);	
		let x = v.mag()-this.restLength;
		v.setMag(this.k*x);
		this.a.applyForce(v);
		v.mult(-1);
		this.b.applyForce(v);
	}

	show(){
		stroke(255);
		strokeWeight(8);
		line(this.a.pos.x,this.a.pos.y,this.b.pos.x,this.b.pos.y);
	}
}