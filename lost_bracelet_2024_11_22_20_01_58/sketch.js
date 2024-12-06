function setup() {
  createCanvas(400, 400);
  noLoop(); // Prevent continuous drawing
}

function draw() {
  background(240, 210, 170); 
  // Put the background in a sand color to mimic beach
  
  // Draw a hint of ocean in the top area
  noStroke();
  fill(150, 200, 255); // ocean color
  rect(0, 0, width, height / 4); 
  // blue strip representing ocean
  
  // Draw the lost bracelet
  // Draw the string that connects all the beads
  noStroke();
  fill (110,110,110);
  rect (60,248,280,3)
  stroke(200);
  
  let beadSize = 15;
  // define starting position of the bracelet
  let x = 60; 
  let y = 250;
  let beadSpacing = beadSize + 1; // Space between beads

  // Draw bead 1: Star
  fill(255, 182, 193); // use light pink
  stroke(100);
  drawStar(x, y, beadSize / 2, beadSize / 4, 5);
  
  // Draw jump ring
  x += beadSpacing;
  fill(200);
  stroke(150);
  ellipse(x, y, 10, 10);
  
  // Draw bead 2: Bunny head
  x += beadSpacing;
  fill(255, 255, 255); // White bunny
  stroke(100);
  ellipse(x, y, beadSize, beadSize); // Bunny head
  ellipse(x - beadSize / 5, y - beadSize / 2, beadSize / 3, beadSize / 1.5); // Left ear
  ellipse(x + beadSize / 5, y - beadSize / 2, beadSize / 3, beadSize / 1.5); // Right ear
  
  // Draw jump ring
  x += beadSpacing;
  fill(200);
  stroke(150);
  ellipse(x, y, 10, 10);
  
  // Draw bead 3: Leaf
  x += beadSpacing;
  fill(144, 238, 144, 150); // Fill with light green
  stroke(100);
  ellipse(x, y, beadSize, beadSize / 1.5); // Leaf shape
  
  // Draw jump ring
  x += beadSpacing;
  fill(200);
  stroke(150);
  ellipse(x, y, 10, 10);
  
  // Repeat for more beads
  // Draw bead 4: Star
  x += beadSpacing;
  fill(255, 182, 193); // Light pink
  stroke(100);
  drawStar(x, y, beadSize / 2, beadSize / 4, 5);
  
  // Draw jump ring
  x += beadSpacing;
  fill(200);
  stroke(150);
  ellipse(x, y, 10, 10);
  
  // Draw bead 5: Bunny head
  x += beadSpacing;
  fill(255, 255, 255); // White
  stroke(100);
  ellipse(x, y, beadSize, beadSize); // Bunny head
  ellipse(x - beadSize / 5, y - beadSize / 2, beadSize / 3, beadSize / 1.5); // Left ear
  ellipse(x + beadSize / 5, y - beadSize / 2, beadSize / 3, beadSize / 1.5); // Right ear
  
  // Draw jump ring
  x += beadSpacing;
  fill(200);
  stroke(150);
  ellipse(x, y, 10, 10);
  
  // Draw bead 6: Leaf
  x += beadSpacing;
  fill(144, 238, 144, 150); // light green
  stroke(100);
  ellipse(x, y, beadSize, beadSize / 1.5); // Leaf shape
  
  // Draw jump ring
  x += beadSpacing;
  fill(200);
  stroke(150);
  ellipse(x, y, 10, 10);
  
  // Draw bead 7: Star
  x += beadSpacing;
  fill(255, 182, 193); // Light pink
  stroke(100);
  drawStar(x, y, beadSize / 2, beadSize / 4, 5);
  
  // Draw jump ring
  x += beadSpacing;
  fill(200);
  stroke(150);
  ellipse(x, y, 10, 10);
  
  // Draw bead 8: Bunny head
  x += beadSpacing;
  fill(255, 255, 255); // White
  stroke(100);
  ellipse(x, y, beadSize, beadSize); // Bunny head
  ellipse(x - beadSize / 5, y - beadSize / 2, beadSize / 3, beadSize / 1.5); // Left ear
  ellipse(x + beadSize / 5, y - beadSize / 2, beadSize / 3, beadSize / 1.5); // Right ear
  
  // Draw jump ring
  x += beadSpacing;
  fill(200);
  stroke(150);
  ellipse(x, y, 10, 10);
  
  // Draw bead 9: Leaf
  x += beadSpacing;
  fill(144, 238, 144, 150); // light green
  stroke(100);
  ellipse(x, y, beadSize, beadSize / 1.5); // Leaf shape
  
  // Draw jump ring
  x += beadSpacing;
  fill(200);
  stroke(150);
  ellipse(x, y, 10, 10);
  
  // Draw lobster clasp closure at the end of the bracelet 
  x += beadSpacing;
  fill(200,0,0);
  stroke(150);
  // Simplify with oval shape
  ellipse(x, y, beadSize / 1, beadSize / 2) 
}

//used stackoverflow for star shapes
//https://stackoverflow.com/questions/62893486/what-is-the-math-behind-creation-of-a-star-in-p5js

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius1;
    let sy = y + sin(a) * radius1;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius2;
    sy = y + sin(a + halfAngle) * radius2;
    vertex(sx, sy);
  }

  endShape(CLOSE);
}
