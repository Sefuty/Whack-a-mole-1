function setup() {


// center canvas 1200,900
  var canvas = createCanvas(1200, 900);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);

  start = millis();
  startTime = millis(); // starttid for countdown
}

var vinder = 0;
var moleX;
var moleY;
var bombX;  
var bombY;
var start;
var milliseconds = 900; // Tid mellem mole movement
var tegnmole = false;
var moleVisning = false; //  variabel Der styre om molen skal vises eller ej
var bombVisning = false; // styre om bomben skal vises eller ej
let moleimg;
var gameOver = false; // gameover sat til false
let bombimg;
var highScore = 0; // hightscore
var startTime; // holder starttid værdien
var countdownDuration = 5000; // cowndown i millisekunder
var countdown; // holder på countdown værdien

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
        highScore = vinder; // ny high score
      }
      startTime = millis(); // starter countdown tidenigen
       } else if (distanceToBomb <= 50) { // 
      console.log("Bomb clicked! Game over!");
      gameOver = true;
    }
  }
}

function draw() {
  background(0, 255, 0);

  
  fill(0);
  textSize(50);
  text("Whack a mole!", width / 2 - 150, 50); 

  // huller
  fill(100,42,42); // brun
  var holeSize = 60; //hul størrelse
  var moleSize = 90; // mole størrelse
  var moleOffsetX = 10; // x position i forhold til firkanten
  var moleOffsetY = 20; //  x position i forhold til firkanten

  // tegn holes, men denne (SKAL FORKLARES GRUNDIG)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      rect(width / 2 - 150 + j * 100 - moleOffsetX, height / 2 - 100 + i * 100 - moleOffsetY, holeSize, holeSize);
    }
  }

  // hvis vinder/score
  textSize(20);
  text("Vinder:", width / 2 - 50, height / 2 + 200);
  text(vinder, width / 2 + 20, height / 2 + 200);

  // tjekker tiden for movemole functionen
  if (millis() - start > milliseconds) {
    moveMole();
    start = millis();
  }

  // tegner hvis den er sat til true
  if (moleVisning) {
    // Draw the mole image with adjustments for centering and size
    image(moleimg, moleX - moleSize / 2, moleY - moleSize / 2, moleSize, moleSize); // Adjust the size and offset as needed
  }
  
  // tegner hvis den er sat til true
  if (bombVisning) {
    image(bombimg, bombX - 45, bombY - 45, 90, 90); // Adjust size and offset as needed
  }
  // tjekker hvis det er gameover
  if (gameOver) {
    gameOverText();
  }

  // tjekker hvis det er gameover pågrund af ingen tid
  if (!gameOver && millis() - startTime > countdownDuration) {
    console.log("Time's up! Game over!");
    gameOver = true;
  }

  //opdatere countdown
  countdown = countdownDuration - (millis() - startTime);
  if (countdown <= 0 && !gameOver) {
    console.log("Time's up! Game over!");
    gameOver = true;
  } else {
    // display countdown
    fill(255);
    textSize(30);
    text("Time left: " + (countdown / 1000).toFixed(1) + " seconds", width / 2, height - 50);
  }
}

function moveMole() {
  var possibleX = [width/2 - 135, width/2 - 35, width/2 + 65]; // centreret mulige X pos
  var possibleY = [height/2 - 85, height/2 + 15, height/2 + 115]; // Centreret mulige Y pos

// random position
  moleX = random(possibleX);
  moleY = random(possibleY);

  //random pos for bomben
  do {
    bombX = random(possibleX);
    bombY = random(possibleY);
  } while (bombX === moleX && bombY === moleY);

  // 
  moleVisning = random() > 0.2; //

  bombVisning = random() > 0.2; //

  milliseconds = 900 - vinder * 50;
  milliseconds = max(100, milliseconds); //
}

function gameOverText() {
  fill(255, 0, 0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Game Over!", width / 2, height / 2);
}
