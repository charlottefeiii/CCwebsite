// steps data: each entry has [6:00-15:00 first half of day steps, 15:00-24:00 second half of day steps]
let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let stepsData = [
  [4000, 2000], // Monday: 3000 steps in day, 2000 steps at night
  [4000, 7000], // Tuesday
  [9000, 5000], // Wednesday
  [3000, 7000], // Thursday
  [8000, 5000], // Friday
  [10000, 5000], // Saturday
  [3000, 4000]  // Sunday
];

// add colors for each row
let rowColors = ['#FFEBEE', '#E3F2FD', '#E8F5E9', '#FFF3E0', '#F3E5F5', '#E1F5FE', '#FBE9E7'];

// array of emojis, when you click, it randonsly shows up on canvas, representing things I notice when I walk
let randomEmojis = ['🌸', '🌼', '🦋', '☁️', '🐛', '🧑‍🤝‍🧑', '🍁'];
let emojiObjects = []; // store emoji objects

function setup() {
  createCanvas(700, 700);
  textSize(20);
  textAlign(LEFT, CENTER); 
  noStroke(); 
}

function draw() {
  background(255);

  for (let i = 0; i < days.length; i++) {
    // set the pastel background color for the row
    fill(rowColors[i]);
    rect(0, i * 100, width, 100); // create a colored rectangle for each day
    fill(40); // Set text color to black
    text(days[i], 40, i * 100 + 50); // write day 
    // draw sun emoji and individual step emojis for am time
    drawEmojis('🌞', 200, i * 100 + 30, stepsData[i][0] / 1000);
    // draw moon emoji and individual step emojis for pm time
    drawEmojis('🌙', 200, i * 100 + 70, stepsData[i][1] / 1000);
  }

  for (let obj of emojiObjects) {
    textSize(obj.size);
    text(obj.emoji, obj.x, obj.y);
  }
}

function drawEmojis(icon, startX, startY, count) {
  textSize(20); // set the size for emojis
  text(icon, startX, startY); // draw sun or moon emoji

  for (let j = 0; j < count; j++) {
    let x = startX + 60 + j * 25; // Offset each step emoji horizontally
    let y = startY;
    text('👣', x, y); // draw individual step emoji
  }
}

function mousePressed() {
  // add a new random emoji when mouse is clicked
  let emoji = random(randomEmojis);
  let x = random(width);
  let y = random(height);
  let size = 20;
  emojiObjects.push({ emoji, x, y, size });
}
