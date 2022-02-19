class ObstacleR extends Obstacle{
	constructor(x,y,w,h,ang){
		super();
		this.pos = createVector(x,y);
		this.dims = createVector(w,h);
		this.ang = ang;
	}

	clamp(b,min,max){
		let a = b.copy();
		if(a.x>max.x){
			a.x = max.x;
		}
		if(a.y>max.y){
			a.y = max.y;
		}
		if(a.x<min.x){
			a.x = min.x;
		}
		if(a.y<min.y){
			a.y = min.y;
		}
		return a;
	}

	intersect(particle,r){
		let p = particle.pos.copy();
		p.x = p.x-this.pos.x;
		p.y = p.y-this.pos.y;
		let x = p.x;
		let y = p.y;
		p.x = cos(this.ang)*x + sin(this.ang)*y;
		p.y = -sin(this.ang)*x+ cos(this.ang)*y;
		let delta = p5.Vector.sub(p,createVector(0,0));
		let d = delta.mag();
		let half_dims = this.dims.copy();
		half_dims.mult(0.5);
		if(d>r+half_dims.mag()){
			return false;
		}
		let mhalf = half_dims.copy();
		mhalf.mult(-1);
		delta = this.clamp(delta,mhalf,half_dims);
		let closest = p5.Vector.add(createVector(0,0),delta);
		return p5.Vector.dist(closest,p)<=r;
		
	}
	projections(particle){
		let p = particle.pos.copy();
		p.x = p.x-this.pos.x;
		p.y = p.y-this.pos.y;
		let x = p.x;
		let y = p.y;
		p.x = cos(this.ang)*x + sin(this.ang)*y;
		p.y = -sin(this.ang)*x+ cos(this.ang)*y;
		let top_left = createVector(-this.dims.x/2,-this.dims.y/2);
		let v = p5.Vector.sub(p,createVector(0,0));
		let ex,ey,tx,ty;
		let new_pos;
		if(v.x >0 && v.y<0){
			ex = top_left.x+this.dims.x;
			ey = top_left.y;
			tx = ex/v.x;
			ty = ey/v.y;
			if(tx<=ty){
				new_pos=createVector(this.dims.x/2,tx*v.y);
			}else{
				new_pos = createVector(ty*v.x,-this.dims.y/2);	
			}
			
		}
		else if(v.x <0 && v.y<0){
			ex = top_left.x;
			ey = top_left.y;
			tx = ex/v.x;
			ty = ey/v.y;
			if(tx<=ty){
				new_pos = createVector(-this.dims.x/2,tx*v.y);
			}else{
				new_pos = createVector(ty*v.x,-this.dims.y/2);	
			}
		}
		else if(v.x >0 && v.y>0){
			ex = top_left.x+this.dims.x;
			ey = top_left.y+this.dims.y;
			tx = ex/v.x;
			ty = ey/v.y;
			if(tx<=ty){
				new_pos = createVector(this.dims.x/2,tx*v.y);
			}else{
				new_pos = createVector(ty*v.x,this.dims.y/2);	
			}
		}
		else if(v.x <0 && v.y>0){
			ex = top_left.x;
			ey = top_left.y+this.dims.y;
			tx = ex/v.x;
			ty = ey/v.y;
			if(tx<=ty){
				new_pos = createVector(-this.dims.x/2,tx*v.y);
			}else{
				
				new_pos = createVector(ty*v.x,this.dims.y/2);	
			}
		}
		else if(v.x==0){
			if(v.y<0){
				new_pos = createVector(0,top_left.y);
			}else{
				new_pos = createVector(0,top_left.y+this.dims.y);
			}
		}
		else if(v.y==0){
			if(v.x<0){
				new_pos = createVector(top_left.x,0);
			}else{
				new_pos = createVector(top_left.x+this.dims.x,0);
			}
		}
		
		let a = p5.Vector.sub(new_pos,createVector(0,0));
		a.mult(1.1);
		new_pos = p5.Vector.add(createVector(0,0),a);
		x = new_pos.x;
		y = new_pos.y;
		new_pos.x = cos(this.ang)*x - sin(this.ang)*y;
		new_pos.y = sin(this.ang)*x + cos(this.ang)*y;
		new_pos = createVector(new_pos.x+this.pos.x,new_pos.y+this.pos.y);
		return new_pos;
	}

	show(){
		fill(255,0,0);
		translate(this.pos.x,this.pos.y);
		rotate(this.ang);
		rect(0,0,this.dims.x,this.dims.y);
		translate(-this.pos.x,-this.pos.y);
	}
}