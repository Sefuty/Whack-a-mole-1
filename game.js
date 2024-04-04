function setup() {
    createCanvas(500,400);
    mouseClicked();
  };

  var vinder = 0;
  var moleX = 0;
  var moleY = 0;
  var start = 0;
var milliseconds = 700;
 
        
// Sleep Function er hvormeget den søver indtil næste molen skal viderer
/*function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
    break;
   }
   }
   }*/
  // https://stackoverflow.com/questions/56260065/js-delay-script-from-running

  

  
function mouseClicked() {

  var distance = int(dist(mouseX, mouseY, moleX, moleY));
  
    if (distance<=50) {
      console.log("mole trykket")
      vinder = vinder+1;
      console.log(vinder)

    }


}
function draw() {


  if ((new Date().getTime() - start) > milliseconds){
    movemole();
    start = new Date().getTime()
  }




 
 // console.log(possibleX);
//  console.log(possibleY);
 // console.log("-------")


background(255,255,255);

// Title
fill(0,0,0);
textSize(50);
text("Whack  a  mole!", 30, 50);





fill(0, 0, 0); // farve af hullerne




/* Huller */

rect(200,100,29,29);
rect(100,100,29,29); // Første 3
rect(300,100,29,29);

rect(200,200,29,29);
rect(100,200,29,29); // Anden 3 
rect(300,200,29,29);

rect(200,300,29,29);
rect(100,300,29,29); // Tredje 3
rect(300,300,29,29);

textSize(20);
text("Vinder:", 100,400)
text(vinder, 170,400);

// Opretes Molen

fill(203,203,65);
ellipse(moleX,moleY,20,20); 

};


function movemole(){
    var possibleX = [115,215,315];
    var possibleY = [115,215,315];

    moleX = random(possibleX);
    moleY = random(possibleY);
    
    
    




}





