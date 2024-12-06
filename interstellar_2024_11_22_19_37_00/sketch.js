//create a traveling in space kinda of feeling 
let stars = [];
function setup() {
  createCanvas(600, 600);
  //use center mode for easier navigation 
  rectMode(CENTER);
  noStroke();
  
  // create random stars
  for (let j = 0; j < 30; j++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(5, 20),
      speed: random(3, 6),
    });
  }
}

function draw() {
  
  let gridSize = 20;
  let maxSquares = 60;
  
  for (let i = 0; i < maxSquares; i++) {
    let mapSize = map(i, 0, maxSquares, 600, 20);
  //create color changes based on frameCount and i
    let colorR = map(sin(frameCount * 0.15 + i * 0.2), -1, 1, 0, 255);
    fill(colorR, 200, 230);
    rect(300, 300, mapSize, mapSize);
  }
  
    for (let j = 0; j < stars.length; j++) {
    let star = stars[j];
    ellipse(star.x , star.y, star.size, star.size);
    fill(220,220,220);
    
    // update star position to move them outwards
    star.x += (star.x - width / 2) * 0.01;
    star.y += (star.y - height / 2) * 0.01;
    
    // reset star if it goes off screen
    if (star.x < 0 || star.x > width || star.y < 0 || star.y > height) {
      star.x = random(width);
      star.y = random(height);
      star.size = random(5, 20);
      star.speed = random(3, 6);
    }
    }
}