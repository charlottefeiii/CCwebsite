function setup() {
  createCanvas(400, 400);
  noCursor(); // hide cursor
  // define heart positions
  for (let x = 20; x < 400; x = x+40) {
    for (let y = 15; y < 390; y = y+40) {
      hearts.push({
        x: x,
        y: y,
      });
    }
  }
}

function draw() {
  let distanceFromCenter = dist(mouseX, mouseY, 200, 200);
  // change color from pink to green reprenting frog's mood when pastic bottle moves closer to center
  background(distanceFromCenter+20, 200,200);
  // start drawing hearts in the background
  drawHearts();
  // define distance to face size
  drawFrogFace(distanceFromCenter); 
  // use the plastic bottle cursor to replace cursor
  drawPlasticBottle(mouseX, mouseY);
  // draw the plastic piece left by the bottle each time you click 
  drawPlasticPieces();
}

let plasticPieces = [];
function drawPlasticPieces() {
  fill(random (0,250), 0, random (0,250)); // plastic pieces color
  for (let i = 0; i < plasticPieces.length; i++) {
    let p = plasticPieces[i];
    rect(p.x, p.y, 20, 10, 2); // draw plastic pieces left behind
  }
}

function drawFrogFace() {
  let distanceFromCenter = dist(mouseX, mouseY, 200, 200);
  stroke (2);
  // frog's face
  fill(144, 220, 144); 
  ellipse(200, 200, 300, 210); 

  //reference colde:        https://editor.p5js.org/sam/sketches/X5XbYo1Um
  let leftEyeX = 110
  let rightEyeX = 290;
  let x = map(mouseX, 0, 400, -20, 20);
  let y = map(mouseY, 0, 400, -20, 20);
 
  //eyes
  fill(255);
  ellipse(leftEyeX, 100, 100, 100);
  ellipse(rightEyeX, 100, 100, 100);
  //frog's pupils
  fill (0);
  ellipse(leftEyeX + x, 100 + y, 45, 45);
  ellipse(rightEyeX + x, 100 + y, 45, 45);

 strokeWeight(4);
 noFill();
  
  // calculate the amount of sadness based on how close the cursor is to the center
  let sadness = map(distanceFromCenter, 0, 200, 1, 0); // 1 is happy, 0 is sad
  
  // draw happy and sad mouth curves based on the cursor's distance to the center
  let mouthY = 250 + sadness * (45); // mouth position
  let startAngle = sadness * PI/2; // happy to unhappy
  let endAngle = (PI/2) * (1 - sadness); // sad to happy
  arc(200, mouthY, 90, 60, startAngle, endAngle); // mouth arc
  
  // frog's nostrils
  fill(0);
  ellipse(170, 200, 15, 15); 
  ellipse(230, 200, 15, 15);

  // frog's cheeks with light pink blush cuz it is cute!
  fill(255, 182, 193); 
  ellipse(80, 230, 60, 30); 
  ellipse(320, 230, 60, 30); 
}

function drawPlasticBottle(x, y) {
  // plastic bottle main body
  fill(215, 215, 215); 
  rect(x, y, 50, 100, 10); 
  // cap
  fill(0, 100, 200); 
  rect(x + 10, y - 20, 30, 20, 5);
}

let hearts = [];    // create & store hearts in background

function drawHearts() {
  hearts.forEach((heart) => {
    let offset = random(-1, 1); //hearting in the background shaking effect showing that frog is nervous
    drawHeart(heart.x + offset, heart.y + offset, 20);
  });
}

function drawHeart(x, y, size) {
  // draw heart shape with reference    https://editor.p5js.org/Mithru/sketches/Hk1N1mMQg
  noStroke ();
  let halfSize = (size / 2);
  let distanceFromCenter = dist(mouseX, mouseY, 200, 200);
    fill(distanceFromCenter-50, 10, 40);
    beginShape();
    vertex(x, y);
    bezierVertex(x - halfSize, y - halfSize, x - size, y + halfSize, x, y + size);
    bezierVertex(x + size, y + halfSize, x + halfSize, y - halfSize, x, y);
    endShape(CLOSE);
}

function mousePressed() {
  // add a new plastic piece at the mouse position
  plasticPieces.push({x: mouseX, y: mouseY});
}
