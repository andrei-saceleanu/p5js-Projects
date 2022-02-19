let rectPos;
let rectDims;
let ang;
let col;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  rectPos = createVector(300,300);
  rectDims = createVector(200,100);
  ang = 3.14159265/4;
}

function mousePressed(){
  console.log(mouseX,mouseY);
}

function draw() {
  background(0);
  let p = createVector(mouseX-rectPos.x,mouseY-rectPos.y);
  let x = p.x;
  let y = p.y;
  p.x = cos(ang)*x + sin(ang)*y;
  p.y = -sin(ang)*x + cos(ang)*y;
  col = 0;
  if(p.x<=rectDims.x/2 && p.x>=-rectDims.x/2 && p.y<=rectDims.y/2 && p.y>=-rectDims.y/2){
    col = 1;
  }
  stroke(255);
  strokeWeight(1);
  if(col==0)
    noFill();
  else
    fill(255);
  push();
  translate(rectPos.x,rectPos.y);
  rotate(ang);
  rect(0,0,rectDims.x,rectDims.y);
  pop();
}