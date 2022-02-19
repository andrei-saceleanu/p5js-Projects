
let width = 600;
let height = 600;
let len = 200;
let ang = 3.14/4;
let s = 0.3;


function setup() {
  createCanvas(width, height);
 
  angSlider = createSlider(0,TWO_PI,PI/4,0.01);
}

function draw() {
  background(0);
  stroke(255);
  translate(width/2,height);
  ang = angSlider.value();
  branch(len,s);
}

function branch(len,s){
  strokeWeight(s);
  line(0,0,0,-len);
  if(len>4){
    push();
    translate(0,-len);
    rotate(ang);
    branch(0.67*len,1.33*s);
    pop();
    push();
    translate(0,-len);
    rotate(-ang);
    branch(0.67*len,1.33*s);
    pop();
  }

}

