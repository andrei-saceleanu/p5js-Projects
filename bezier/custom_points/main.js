

let width = 600;
let height = 600;
let p = [];
let t = 0;
let v = 0;
let sgn = 1;
let end_pos = [];
let start = 0;
let backup_sgn;

function setup(){
	
	createCanvas(width,height);
}

function mousePressed(){
	let newPoint = createVector(mouseX,mouseY);
	let dim = p.length;
	p[dim] = []
	for(let i = 0;i<=dim;i++){
		p[dim][i] = createVector(0,0);
	}
	p[dim][0] = newPoint.copy();
	
}

function keyTyped(){
	if(key === 's')
		start = 1-start;
	if(key === 'h'){
		if(sgn!=0){
			backup_sgn = sgn;
			sgn = 0;
		}
	}
	if(key === 'c'){
		sgn = backup_sgn;
	}
}

function draw(){
	background(0);
	stroke(255);
	strokeWeight(8);
	for(let i = 0;i<p.length;i++){
		point(p[i][0].x,p[i][0].y);
	}
	if(start){
		colorMode(HSB);
		strokeWeight(4);
		for(let j = 0;j<p.length;j++){
			
			if(j>0){
				for(let i=j;i<p.length;i++){
					p[i][j] = p5.Vector.add(p5.Vector.mult(p[i-1][j-1],1-t),p5.Vector.mult(p[i][j-1],t));
				}
			}
			stroke(v,100,100);
			for(let i = j;i<p.length-1;i++){
				line(p[i][j].x,p[i][j].y,p[i+1][j].x,p[i+1][j].y);
			}
			v += 15;

		}
		stroke(255,100,100);
		strokeWeight(20);
		end_pos.push(p[p.length-1][p.length-1]);
		for(let i = 1;i<end_pos.length;i++){
			line(end_pos[i].x,end_pos[i].y,end_pos[i-1].x,end_pos[i-1].y);
		}
		
		t+= sgn*0.01;
		if(t>1){
			t=1;
			end_pos = [];
			sgn = -sgn;
		}
		if(t<0){
			t=0;
			end_pos = [];
			sgn = -sgn;
		}
		v=0;
	}

}