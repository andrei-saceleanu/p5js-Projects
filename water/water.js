let cols;
let rows;
let current; // = new float[cols][rows];
let previous; // = new float[cols][rows];

let dampening = 0.999;

function setup() {
  pixelDensity(1);
  createCanvas(600, 600);
  cols = width;
  rows = height;
  // The following line initializes a 2D cols-by-rows array with zeroes
  // in every array cell, and is equivalent to this Processing line:
  // current = new float[cols][rows];
  current = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
  previous = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
  /*for(let i = 1;i <= 10 ;i++){
    for(let j = 1;j <= 10; j++){
      previous[400+i][400+j]=500;
    }
  }*/
  
}

function mousePressed() {
  previous[mouseX][mouseY] = 500;
}

function draw() {
  background(0);

  loadPixels();
  for (let i = 1; i < cols - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      current[i][j] =
        (previous[i - 1][j] +
          previous[i + 1][j] +
          previous[i][j - 1] +
          previous[i][j + 1]) /
          2 -
        current[i][j];
      current[i][j] = current[i][j] * dampening;
      // Unlike in Processing, the pixels array in p5.js has 4 entries
      // for each pixel, so we have to multiply the index by 4 and then
      // set the entries for each color component separately.
      let index = (i + j * cols) * 4;
      pixels[index + 0] = current[i][j]*255;
      pixels[index + 1] = current[i][j]*255;
      pixels[index + 2] = current[i][j]*255;
    }
  }
  updatePixels();

  let temp = previous;
  previous = current;
  current = temp;
}