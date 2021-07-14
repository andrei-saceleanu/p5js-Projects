function Bird(){
	this.pos = height/2;
	this.r = 30;
	this.v = 0;

	this.update = function(){
		this.v += 0.25;
		this.pos += this.v;
	}

	this.ground = function(){
		return this.pos -this.r >= height;
	}

	this.show = function(){
		fill(255);
		ellipse(width/6,this.pos,this.r,this.r);
	}
}