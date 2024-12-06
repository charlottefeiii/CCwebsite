let sparkles = [];
let shootingStars = [];

function setup() {
  createCanvas(1000, 400);
  noStroke();
  canvas.parent('sketch'); // Attach this sketch to the first container
}

function draw() {
  // Slightly translucent background for a fading trail effect
  background(0, 50);

  // Create new sparkles randomly
  if (random() < 0.5) {
    let sparkle = {
      x: random(width),
      y: random(height),
      size: random(2, 8),
      brightness: 255,
      decay: random(2, 5),
    };
    sparkles.push(sparkle);
  }

  // Occasionally create a shooting star
  if (random() < 0.01) {
    let shootingStar = {
      x: random(width / 2, width),
      y: random(height / 2),
      speedX: random(-8, -4),
      speedY: random(2, 4),
      size: random(4, 10),
      trail: [],
      trailLength: 10,
      color: color(255, 140, 0), // Burnt orange color
    };
    shootingStars.push(shootingStar);
  }

  // Draw and update sparkles
  for (let i = sparkles.length - 1; i >= 0; i--) {
    let s = sparkles[i];
    fill(s.brightness, s.brightness, s.brightness);
    ellipse(s.x, s.y, s.size);

    // Update sparkle properties
    s.brightness -= s.decay;

    // Remove sparkle if it has faded
    if (s.brightness <= 0) {
      sparkles.splice(i, 1);
    }
  }

  // Draw and update shooting stars
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    let star = shootingStars[i];

    // Update position
    star.x += star.speedX;
    star.y += star.speedY;

    // Add current position to the trail
    star.trail.push({ x: star.x, y: star.y });
    if (star.trail.length > star.trailLength) {
      star.trail.shift(); // Remove oldest point if trail exceeds length
    }

    // Draw trail
    for (let j = 0; j < star.trail.length; j++) {
      let trailPart = star.trail[j];
      let alpha = map(j, 0, star.trail.length - 1, 50, 255);
      fill(red(star.color), green(star.color), blue(star.color), alpha);
      ellipse(trailPart.x, trailPart.y, star.size * (j / star.trail.length));
    }

    // Remove shooting star if it exits the canvas
    if (star.x < 0 || star.y > height) {
      shootingStars.splice(i, 1);
    }
  }
}
