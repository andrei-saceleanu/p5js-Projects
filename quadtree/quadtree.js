
class Quadtree{
	constructor(boundary,n){
		this.boundary = boundary;
		this.capacity = n;
		this.points = [];
		this.divided = false;
	}


	subdivide(){
		let x = this.boundary.x;
		let y = this.boundary.y;
		let w = this.boundary.w;
		let h = this.boundary.h;
		let ne = new Rectangle(x+w/2,y-h/2,w/2,h/2);
		let nw = new Rectangle(x-w/2,y-h/2,w/2,h/2);
		let se = new Rectangle(x+w/2,y+h/2,w/2,h/2);
		let sw = new Rectangle(x-w/2,y+h/2,w/2,h/2);
		this.ne = new Quadtree(ne,this.capacity);
		this.nw = new Quadtree(nw,this.capacity);
		this.se = new Quadtree(se,this.capacity);
		this.sw = new Quadtree(sw,this.capacity);
		this.divided = true;
	}

	insert(point){
		if(!this.boundary.contains(point))
			return;
		if(this.points.length<this.capacity){
			this.points.push(point);
		}else{
			if(!this.divided)
				this.subdivide();
			this.ne.insert(point);
			this.nw.insert(point);
			this.sw.insert(point);
			this.se.insert(point);
		}
	}
	query(range, found) {
	    if (!found) {
	      found = [];
	    }
	    if (!this.boundary.intersects(range)) {
	      return;
	    } else {
	      for (let p of this.points) {
	        if (range.contains(p)) {
	          found.push(p);
	        }
	      }
	      if (this.divided) {
	        this.nw.query(range, found);
	        this.ne.query(range, found);
	        this.sw.query(range, found);
	        this.se.query(range, found);
	      }
	    }
	    return found;
  	}

	show(){
		this.boundary.show();
		for(let p of this.points){
			stroke(255);
			strokeWeight(4);
			point(p.x,p.y);
		}
		if(this.divided){
			this.ne.show();
			this.nw.show();
			this.sw.show()
			this.se.show();	
		}
	}
}


class Rectangle{
	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	contains(point){
		let x = point.x;
		let y = point.y;
		return (x < this.x+this.w) && (x >= this.x-this.w) && (y < this.y+this.h) && (y > this.y-this.h);
	}

	show(){
		stroke(255);
		strokeWeight(1);
		noFill();
		rectMode(CENTER);
		rect(this.x,this.y,2*this.w,2*this.h);
	}

	intersects(range) {
	    return !(
	      range.x - range.w > this.x + this.w ||
	      range.x + range.w < this.x - this.w ||
	      range.y - range.h > this.y + this.h ||
	      range.y + range.h < this.y - this.h
	    );
  	}
}