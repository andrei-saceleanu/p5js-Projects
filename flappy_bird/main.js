

let bird;
let width = 600;
let height = 600;
let wall;
let walls = new Array(10);

function setup(){
	createCanvas(width,height);
	bird = new Bird();
	//wall = new Wall();
	for(let i = 0;i<10;i++){
		walls[i]= new Wall(i);
	}
}

function mouseClicked(){
	bird.v = -8;
}

function draw(){
	background(0);
	bird.update();
	for(let wall of walls){
		wall.update();
	}
	if(bird.ground())
		bird = new Bird();
	//wall.show();
	for(let wall of walls){
		wall.show();
	}

	bird.show();
}