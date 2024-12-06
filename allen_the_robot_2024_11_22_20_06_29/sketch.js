function setup() {
  createCanvas(400, 600);
  background(10,52,99);

  // draw upper body
  drawLowerBody(200, 400);
  // draw robot head
  drawUpperBody(200, 300, 100, 150);
  // draw lower body
  drawRobotHead(120, 80, 150, 130);
  
  osc = new p5.Oscillator('sine');
  osc.freq(200);  // lower the frequency for a deeper robot sound
  osc.amp(0);     // start with the oscillator turned off
  
}


function draw (){
  noStroke();
  
  fill(random (100,200),20,50);
  ellipse(50,150,50,50);
    
  fill(255,random(150,200),0);
  ellipse(350,230,80,80);
  
  fill(random(20,100), 200,150);
  ellipse(30,400,20,20);
  
  fill(0,random (80,100),204)
  ellipse (200,800,600,600)
}

function drawLowerBody(x, y) {
  stroke(170, 50, 106);
  strokeWeight(20);
  noFill();

  // draw tail
  beginShape();
  curveVertex(x, y-200);       // Start at waist
  curveVertex(x - 10, y);  // Curve downward
  curveVertex(x + 80, y + 50); 
  curveVertex(x - 80, y + 40);
  curveVertex(x + 70, y + 70);
  curveVertex(x - 80, y + 80);
  curveVertex(x + 60, y + 70);
  curveVertex(x +140, y+50);
  curveVertex(x +120, y);  
  curveVertex(x, y + 120);   
  endShape();
  
}

function drawUpperBody(x, y, w, h) {
  strokeWeight (2);
  stroke(15,15,15);
  fill (204,85,0);
  triangle (100,270,300,270,200,190);
  rect(100,265,200,40,10);
  fill (85,85,0);
  rect(130,270,140,100,5);

  // arms 
  stroke(15,15,15);
  strokeWeight (5);
  fill (204,85,0)
  rect(x - 130, y, x*0.3, 20); // left arm
  rect(x + 70, y, x*0.3, 20); // right arm

  // thumbs (small lines pointing upward)
  stroke(15,15,15);
  strokeWeight (10);
  line(x - w*1.3, y + h * 0.1, x - w*1.3, y-10); // Left thumb
  line(x + w*1.3, y + h * 0.1, x + w*1.3, y-10); // Right thumb
  
  // butt...
  strokeWeight(0);
  ellipse(x - w * 0.45, y + h * 0.6, 90, 85);
  ellipse(x + w * 0.45, y + h * 0.6, 90, 85);
  strokeWeight (0);
  fill (215,215,215)
  ellipse(x + w * 0.6, y + h * 0.5, 10, 20);
  ellipse(x - w * 0.3, y + h * 0.5, 10, 20);
  ellipse(x + w * 0.7, y + h * 0.6, 5, 10);
  ellipse(x - w * 0.2, y + h * 0.6, 5, 10);
  
}

function drawRobotHead(x, y, w, h) {
  // robot head
  strokeWeight(5);
  stroke (15,15,15);
  fill(215,215,200);
  rect(x, y, w, h, 10);

  // robot eyes
  strokeWeight(5);
  ellipse(x + w * 0.3, y + h * 0.5, w * 0.3, h * 0.3);
  ellipse(x + w * 0.7, y + h * 0.5, w * 0.3, h * 0.3);
  strokeWeight(8);
  ellipse(x + w * 0.3, y + h * 0.5, w * 0.1, h * 0.1);
  ellipse(x + w * 0.7, y + h * 0.5, w * 0.1, h * 0.1);

  // robot antenna & random dots on face
  strokeWeight(5);
  line(x + w / 2, y, x + w / 2, y - 30);
  ellipse(x + w / 2, y - 38, 10, 10);
  strokeWeight(3);
  ellipse(x + 15, y + 15, 10, 10);
  ellipse(x + 135, y + 15, 10, 10);
  ellipse(x + 15, y + 115, 10, 10);
  ellipse(x + 135, y + 115, 10, 10);
  ellipse(x + 75, y + 115, 4, 4);
  ellipse(x + 75, y + 15, 4, 4);

  // robot ears
  strokeWeight(5)
  rect(x - 20, y + h / 2.5, 20, 20);
  rect(x + w, y + h / 2.5, 20, 20);
  rect(x - 10, y + h / 3, 10, 40);
  rect(x + w, y + h / 3, 10, 40);
}

function keyPressed() {
// play the oscillator when a key is pressed
  osc.start();
  osc.amp(0.3, 0.1); // Fade in volume over 0.1 seconds
}

function keyReleased() {
  // stop oscillator when the key is released
  osc.amp(0, 0.2); // fade out volume over 0.5 seconds
  osc.stop(1);   // stop the oscillator after 0.6 seconds
}

