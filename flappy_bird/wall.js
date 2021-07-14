function Wall(i){
	this.w = 50;
	this.x = width+300*i;
	this.gap = random(height/3,height/2);
	this.up = random(0,height-this.gap);

	this.update = function(){
		this.x -= 1;
	}

	this.show = function(){
		fill(255);
		rect(this.x,0,this.w,this.up);
		rect(this.x,this.gap+this.up,this.w,height-this.gap-this.up)
	}
}