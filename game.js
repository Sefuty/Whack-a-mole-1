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
var bombX;  
var bombY;
var start;
var milliseconds = 900; // Tid mellem mole bevægelser
var tegnmole = false;
var moleVisning = false; // Ny variabel til at styre om molen skal vises eller ej
let moleimg;
var gameOver = false; // Fixed typo in variable name
let bombimg;

function preload(){
  moleimg = loadImage("mole.png");
  bombimg = loadImage("bomb.png")
}

function mouseClicked() {
  if (!gameOver) {
    var distanceToMole = int(dist(mouseX, mouseY, moleX, moleY));
    var distanceToBomb = int(dist(mouseX, mouseY, bombX, bombY));
    
    if (distanceToMole <= 50) {
      console.log("Mole clicked!");
      vinder++;
      if (vinder > highScore) {
        highScore = vinder; // Update high score
      }
    } else if (distanceToBomb <= 30) { // Adjust the radius according to bomb size
      console.log("Bomb clicked! Game over!");
      gameOver = true;
    }
  }
}

function draw() {
  background(0, 255, 0);

  // Title
  fill(0);
  textSize(50);
  text("Whack a mole!", width / 2 - 150, 50); // Centered title

  // Holes
  fill(100,42,42);
  var holeSize = 60; // Size of the holes
  var moleSize = 90; // Decreased size of the mole
  var moleOffsetX = 10; // Adjust the mole's X offset (to the left)
  var moleOffsetY = 20; // Adjust the mole's Y offset towards the center of the hole

  // Draw holes
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      rect(width / 2 - 150 + j * 100 - moleOffsetX, height / 2 - 100 + i * 100 - moleOffsetY, holeSize, holeSize);
    }
  }

  // Show winner
  textSize(20);
  text("Vinder:", width / 2 - 50, height / 2 + 200);
  text(vinder, width / 2 + 20, height / 2 + 200);

  // Check if it's time for mole movement
  if (millis() - start > milliseconds) {
    moveMole();
    start = millis();
  }

  // Draw mole only if moleVisning is true
  if (moleVisning) {
    // Draw the mole image with adjustments for centering and size
    image(moleimg, moleX - moleSize / 2, moleY - moleSize / 2, moleSize, moleSize); // Adjust the size and offset as needed
  }
  
  // Draw bomb
  image(bombimg, bombX - 30, bombY - 30, 60, 60); // Adjust size and offset as needed

  // Check if game is over and display game over text
  if (gameOver) {
    gameOverText();
  }
}

function moveMole() {
  var possibleX = [width/2 - 135, width/2 - 35, width/2 + 65]; // Centreret mulige X-koordinater
  var possibleY = [height/2 - 85, height/2 + 15, height/2 + 115]; // Centreret mulige Y-koordinater

  // Randomly assign mole position
  moleX = random(possibleX);
  moleY = random(possibleY);

  // Randomly assign bomb position, ensuring it's not in the same square as the mole
  do {
    bombX = random(possibleX);
    bombY = random(possibleY);
  } while (bombX === moleX && bombY === moleY);

  // Randomly set moleVisning to true or false to create periods of silence
  moleVisning = random() > 0.2; // Adjust the threshold as needed
}

function gameOverText() {
  fill(255, 0, 0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Game Over!", width / 2, height / 2);
}
