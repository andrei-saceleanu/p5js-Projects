

let width = 600;
let height = 600;
let p = [];
let t = 0;
let v = 0;
let sgn = 1;
let end_pos = [];

function setup(){
	
	createCanvas(width,height);
	for(let i = 0 ;i< 10;i++){
		p[i] = [];
		for(let j = 0;j<=i;j++){
			p[i][j] = createVector(random(width),random(height));
		}
	}
	
}

function draw(){
	background(0);
	colorMode(HSB);
	strokeWeight(4);
	for(let j = 0;j<10;j++){
		
		if(j>0){
			for(let i=j;i<10;i++){
				p[i][j] = p5.Vector.add(p5.Vector.mult(p[i-1][j-1],1-t),p5.Vector.mult(p[i][j-1],t));
			}
		}
		stroke(v,100,100);
		for(let i = j;i<9;i++){
			line(p[i][j].x,p[i][j].y,p[i+1][j].x,p[i+1][j].y);
		}
		v += 15;

	}
	stroke(255,100,100);
	strokeWeight(20);
	end_pos.push(p[9][9]);
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