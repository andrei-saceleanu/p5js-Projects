

let width = 600;
let height = 600;
let color;
let vertices = [];
let center;

function setup(){
	createCanvas(width,height);
	for(let i=0;i<8;i++){
		let a = 2*3.14*i/8;
		vertices.push(createVector(300+100*cos(a),300+100*sin(a)));
	}
	center = createVector(300,300);
}


function inside(p,p1,p2,p3){
	let x = p5.Vector.sub(p1,p);
	let y = p5.Vector.sub(p2,p);
	let z = p5.Vector.sub(p3,p);
	let a = p5.Vector.sub(p2,p1);
	let b = p5.Vector.sub(p3,p1);
	let area = 0.5*p5.Vector.mag(p5.Vector.cross(a,b));
	let a1 = 0.5*p5.Vector.mag(p5.Vector.cross(x,y));
	let a2 = 0.5*p5.Vector.mag(p5.Vector.cross(y,z));
	let a3 = 0.5*p5.Vector.mag(p5.Vector.cross(z,x));
	if(abs(area-(a1+a2+a3))<0.1)
		return true;
	return false;
}

function draw(){
	background(0);
	let p1 = createVector(300,100);
	let p2 = createVector(400,300);
	let p3 = createVector(200,500);
	let p = createVector(mouseX,mouseY);
	// if(inside(p,p1,p2,p3)){
	// 	color.y = 0;
	// 	color.z = 0;
	// }
	
	
	for(let i=0;i<vertices.length;i++){
		let next = (i<vertices.length-1)?vertices[i+1]:vertices[0];
		color = createVector(255,255,255);
		if(inside(p,center,vertices[i],next)){
			color.y = 0;
			color.z = 0;
		}
		fill(color.x,color.y,color.z);
		triangle(center.x,center.y,vertices[i].x,vertices[i].y,next.x,next.y);
	}
}