

function Boid(){
	this.pos = createVector(random(width),random(height));
	this.vel = createVector(random(-10,10),random(-10,10));
	this.acc = createVector();
	this.maxspeed = 5;
	this.r = 10;
	this.maxradius = 50;
	this.maxforce = 1;

	this.align = function(flock){
		let s = createVector(0,0);
		let cnt = 0;
		for(let boid of flock){
			let d = dist(this.pos.x,this.pos.y,boid.pos.x,boid.pos.y);
			if(boid!= this && d<this.maxradius){
				cnt += 1;
				s.add(boid.vel);
			}
		}
		
		if(cnt>0){
			s.div(cnt);
			s.setMag(this.maxspeed);
			s.sub(this.vel);
			s.limit(this.maxforce);
			
		}
		return s;
	}

	this.cohesion = function(flock){
		let s = createVector(0,0);
		let cnt = 0;
		for(let boid of flock){
			let d = dist(this.pos.x,this.pos.y,boid.pos.x,boid.pos.y);
			if(boid!= this && d<this.maxradius){
				cnt += 1;
				s.add(boid.pos);
			}
		}
		
		if(cnt>0){
			s.div(cnt);
			s.sub(this.pos);
			s.setMag(this.maxspeed);
			s.sub(this.vel);
			s.limit(this.maxforce);
			
		}
		return s;
	}

	this.separate = function(flock){
		let s = createVector(0,0);
		let cnt = 0;
		for(let boid of flock){
			let d = dist(this.pos.x,this.pos.y,boid.pos.x,boid.pos.y);
			if(boid!= this && d<this.maxradius){
				let v = p5.Vector.sub(this.pos,boid.pos);
				cnt++;
				v.div(d*d);
				s.add(v);
			}
		}
		if(cnt>0){
			s.div(cnt);
			s.setMag(this.maxspeed);
			s.sub(this.vel);
			s.limit(this.maxforce);
		}
		return s;
	}

	this.avoid = function(predator){
		let d = dist(this.pos.x,this.pos.y,predator.x,predator.y);
		let diff = p5.Vector.sub(this.pos,predator);
		diff.div(d);
		let a = this.vel.copy();
		diff.sub(a);
		diff.limit(this.maxforce);
		return diff;
	}

	this.force = function(flock,predator){
		let align = this.align(flock);
		let c = this.cohesion(flock);
		let sep = this.separate(flock);
		let av = this.avoid(predator);
		
		this.acc.add(align);
		this.acc.add(c);
		this.acc.add(sep);
		this.acc.add(av);
	}

	this.update = function(){
		this.vel.add(this.acc);
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.show = function(){
		ellipse(this.pos.x,this.pos.y,this.r,this.r);
	}

	this.show2 = function(){
	    strokeWeight(8);
	    stroke(255);
	    point(this.pos.x, this.pos.y);
	}

	this.edges = function(){
		if(this.pos.x<-this.r){
			this.pos.x = width+this.r;
		}
		if(this.pos.x>width+this.r){
			this.pos.x = -this.r;
		}
		if(this.pos.y<-this.r){
			this.pos.y = height+this.r;
		}
		if(this.pos.y>height+this.r){
			this.pos.y = -this.r;
		}
	}
}