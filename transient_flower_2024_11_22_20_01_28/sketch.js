let petal1, petal2, petal3, petal4, petal5, petal6, petal7;
let fallenPetals = 0;
let fallTime = 3000; // 3 seconds for each to fall
let lastFallTime;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  
  // define petal positions
  petal1 = {x: 300, y: 250, angle: 0, falling: false};
  petal2 = {x: 300, y: 250, angle: 51, falling: false};
  petal3 = {x: 300, y: 250, angle: 102, falling: false};
  petal4 = {x: 300, y: 250, angle: 153, falling: false};
  petal5 = {x: 300, y: 250, angle: 204, falling: false};
  petal6 = {x: 300, y: 250, angle: 256, falling: false};
  petal7 = {x: 300, y: 250, angle: 306, falling: false};

  lastFallTime = millis();
}

function draw() {
  background(50, 20, 20);
  
   if (mouseX>200 && mouseX<400 && mouseY>200 && mouseY<400){
    noStroke ();
    textSize(30);
    fill(215,220,190);
    text("a week's passing in flower clock", 100,150);
  }
  else {
    noStroke ();
    textSize(60);
    fill(220,random (170,180),random (150,200));
    rect (0,90,600,60);
    rect (0,250,600,60);
    rect (0,410,600,60);
    rect (50,0,60,600);
    rect (490,0,60,600);
    fill(215,215,215);
    text("nothing", 130, 140);
    text ("is ever", 400, 300);
    text ("eternal",100, 460) ;
  }
  
  // draw stem
  stroke(34, 139, 34);
  strokeWeight(10);
  rect (300,250,0,400);
    
  // draw the flower center
  fill(255, 255, 215);
  noStroke();
  ellipse(300, 250, 60, 60);

  // draw each petal
  fill(255, 127, 80);

  // draw petals based on their current state (falling or not)
  drawPetal(petal1);
  drawPetal(petal2);
  drawPetal(petal3);
  drawPetal(petal4);
  drawPetal(petal5);
  drawPetal(petal6);
  drawPetal(petal7);

  function drawPetal(petal) {
  push();
  translate(petal.x, petal.y);
  rotate(petal.angle);
  ellipse(0, 70, 45, 80); // draw petal shape
  pop();

  // if the petal is falling, move it down
  if (petal.falling) {
    petal.y += 5;
  }
}

function markFallingPetal() {
  if (fallenPetals == 1) petal1.falling = true;
  else if (fallenPetals == 2) petal2.falling = true;
  else if (fallenPetals == 3) petal3.falling = true;
  else if (fallenPetals == 4) petal4.falling = true;
  else if (fallenPetals == 5) petal5.falling = true;
  else if (fallenPetals == 6) petal6.falling = true;
  else if (fallenPetals == 7) petal7.falling = true;
}
  // a petal falls every 3 seconds
  if (millis() - lastFallTime > fallTime && fallenPetals < 7) {
    fallenPetals = fallenPetals +1 ;
    markFallingPetal();
    lastFallTime = millis();
  }
  
    // reset petals when all petals are gone
  if (fallenPetals === 7 && petal7.y > height+50) {
    resetFlower();
  }
}

  // reset petals and the timer when petls are all gone
function resetFlower() {
  fallenPetals = 0;
  resetPetals();  
  lastFallTime = millis(); 
}

function resetPetals() {
  petal1 = {x: 300, y: 250, angle: 0, falling: false};
  petal2 = {x: 300, y: 250, angle: 51, falling: false};
  petal3 = {x: 300, y: 250, angle: 102, falling: false};
  petal4 = {x: 300, y: 250, angle: 153, falling: false};
  petal5 = {x: 300, y: 250, angle: 204, falling: false};
  petal6 = {x: 300, y: 250, angle: 256, falling: false};
  petal7 = {x: 300, y: 250, angle: 306, falling: false};
}
