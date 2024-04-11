function setup() {
  // Ændret canvas størrelse til 1200x900 og centreret det på siden
  var canvas = createCanvas(1200, 900);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);

  start = millis();
}

var vinder = 0;
var moleX;
var moleY;
var start;
var milliseconds = 900; // Tid mellem mole bevægelser
var tegnmole = false;
let moleimg;

function preload(){
  moleimg = loadImage("mole.png");

}

  


function mouseClicked() {
  var distance = int(dist(mouseX, mouseY, moleX, moleY));
  if (distance <= 50) {
    console.log("mole trykket");
    vinder = vinder + 1;
    console.log(vinder);
  }
}

function draw() {
  background(255);

  // Title
  fill(0);
  textSize(50);
  text("Whack a mole!", width/2 - 150, 50); // Centered title

  // Holes
  fill(0);
  var holeSize = 40; // Size of the holes
  var moleSize = 45 ; // Decreased size of the mole
  var moleOffset = (holeSize - moleSize) / 2; // Offset to center the mole within the hole
  rect(width/2 - 50 - moleOffset, height/2 - 100 - moleOffset, holeSize, holeSize); // Centered holes
  rect(width/2 - 150 - moleOffset, height/2 - 100 - moleOffset, holeSize, holeSize);
  rect(width/2 + 50 - moleOffset, height/2 - 100 - moleOffset, holeSize, holeSize);
  rect(width/2 - 50 - moleOffset, height/2 - moleOffset, holeSize, holeSize);
  rect(width/2 - 150 - moleOffset, height/2 - moleOffset, holeSize, holeSize);
  rect(width/2 + 50 - moleOffset, height/2 - moleOffset, holeSize, holeSize);
  rect(width/2 - 50 - moleOffset, height/2 + 100 - moleOffset, holeSize, holeSize);
  rect(width/2 - 150 - moleOffset, height/2 + 100 - moleOffset, holeSize, holeSize);
  rect(width/2 + 50 - moleOffset, height/2 + 100 - moleOffset, holeSize, holeSize);

  // Show winner
  textSize(20);
  text("Vinder:", width/2 - 50, height/2 + 200);
  text(vinder, width/2 + 20, height/2 + 200);

  // Check if it's time for mole movement
  if (millis() - start > milliseconds) {
    moveMole();
    start = millis();
  }
  
  if (tegnmole == true) {
    // Draw the mole image with adjustments for centering and size
    image(moleimg, moleX - moleSize/2, moleY - moleSize/2, moleSize, moleSize); // Adjust the size and offset as needed
  }
}




function moveMole() {
  tegnmole = random() > 0.4 ? true : false;

  var possibleX = [width/2 - 135, width/2 - 35, width/2 + 65]; // Centreret mulige X-koordinater
  var possibleY = [height/2 - 85, height/2 + 15, height/2 + 115]; // Centreret mulige Y-koordinater
  moleX = random(possibleX);
  moleY = random(possibleY);
}
