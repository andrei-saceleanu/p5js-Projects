class ObstacleC extends Obstacle{
	constructor(x,y,rad,color){
		super();
		this.pos = createVector(x,y);
		this.r = rad;
		this.color = color;
	}

	intersect(particle,r){
		let d = p5.Vector.dist(particle.pos,this.pos);
		return d<=r+this.r;
	}

	show(){
		noStroke();
		fill(this.color.x,this.color.y,this.color.z);
		ellipse(this.pos.x,this.pos.y,2*this.r,2*this.r);
	}
}