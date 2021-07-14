

let width = 600;
let height = 600;
let q;

function setup(){
	createCanvas(width,height);
	background(0);
	q = new Quadtree(new Rectangle(width/2,height/2,width/2,height/2),4);
	for(let i = 0;i<1000;i++){
		q.insert(createVector(random(width),random(height)));
	}
	console.log(q);
	q.show();
}


function mouseDragged(){
	q.insert(createVector(mouseX,mouseY));
}

function draw(){
	background(0);
	q.show();
	stroke(0, 255, 0);
  	rectMode(CENTER);
  	let range = new Rectangle(mouseX, mouseY, 50, 50);


 	if (mouseX < width && mouseY < height) {
    	rect(range.x, range.y, range.w * 2, range.h * 2);
    	let points = q.query(range);
    	for (let p of points) {
      		strokeWeight(4);
      		point(p.x, p.y);
    	}
  	}
}