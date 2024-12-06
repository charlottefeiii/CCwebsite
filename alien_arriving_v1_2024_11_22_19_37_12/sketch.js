let gameState = 'start';
let images = [];
let creatures = [];
let bombs = [];
let score = 0;
let player;
let creatureInterval = 1500;
let createBomb = 2000;
let timeLimit = 90000; //1.5 min of playtime
let lastCreateTime = 0;
let lastBombTime = 0;
let startTime;
let dialogueIndex = 0;
let dialogue = [
  "alien: why are you chasing us?",
  "girl: I just want to understand why you’re here in the desert.",
  "creature: we’re lost and looking for a place to belong.",
  "girl: maybe we can find a way to help each other?",
  "creature: that will be so nice."
];

let textY;
let alienSound;
let bombSound;

function preload() {
  imgGirl = loadImage('images/girl.png'); 
  images[0] = loadImage("images/jellyfish.png");
  images[1] = loadImage("images/robot.png");
  imgDesert = loadImage("images/desert.webp");
  imgBomb = loadImage("images/bomb.png");
  font = loadFont('/assets/DMSerifDisplay-Regular.ttf');
  bgMusic = loadSound('/assets/gamemusic.m4a')
bombSound = loadSound('/assets/bomb.mov')
alienSound = loadSound('/assets/robot.mp3.mov')
dialogueMusic = loadSound('/assets/dialogue.mp3')
winMusic = loadSound('/assets/win.mp3')
gameoverMusic = loadSound ('/assets/GameOver.mp3')
  
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(20);
  textFont(font);
  
  player = {
    x: width / 2,
    y: height / 2,
    speed: 6,
  };
  
  textY = height;
}

function draw() {
  image(imgDesert, width / 2, height / 2, 600, 600);
  
  switch (gameState) {
    case 'start':
      StartScreen();
      break;
    case 'intro':
      IntroScreen();
      break;
    case 'playing':
      GameScreen();
      break;
    case 'dialogue':
      DialogueScreen();
      break;
    case 'win':
      WinScreen();
      break;
    case 'end':
      EndScreen();
      break;
  }
  textY -= 2;
}

function StartScreen() {
  textSize(30);
  fill(53, 33, 0);
  text('look at the sky, aliens are arriving', width / 2, textY);
  textSize(20);
  text('press any key to start', width / 2, textY + 40);
}

function IntroScreen() {
  textSize(25);
   fill(53, 33, 0);
  text("perhaps you can talk to them to make peace?", width / 2, height / 2);
  textSize(20);
  text('press any key to continue', width / 2, height / 2 + 40);
}

function GameScreen() {
  displayPlayer();
  createCreatures();
  createBombs();
  updateAndDisplayCreatures();
  updateAndDisplayBombs();
  girlMove();
  checkCollisions();
  checkBombCollisions();
  
  fill(255);
  textSize(20);
  text(`Score: ${score}`, width / 2, 50);
    
  // Check if time limit is reached without reaching a score of 10
  if (millis() - startTime > timeLimit && score < 10) {
    gameState = 'end'; // End game if time limit is reached without reaching score of 10
  }
  
  // Check if score reaches 10 within time limit to trigger the dialogue
  if (score >= 10 && gameState === 'playing' && millis() - startTime <= timeLimit) {
    gameState = 'dialogue';
    dialogueIndex = 0;
  }
}

function DialogueScreen() {
 // Draw dialogue box
  fill(50, 50, 50, 200); // Add dialogue box
  rect(width / 2 - 225, height - 150, 450, 100, 10); // Box position, width, height, and corner radius

  // Display dialogue text inside the box
  fill(255);
  textSize(15);
  text(dialogue[dialogueIndex], width / 2, height - 120); // Position text within the dialogue box

  // Display prompt to continue
  textSize(10);
  text("Press any key to continue", width / 2, height - 80);
}

function WinScreen() {
  textSize(30);
  fill(50, 50, 51);
  text('it is a win-win for you and aliens!', width / 2, height / 2);
  textSize(20);
  text('congrats on making peace!', width / 2, height / 2 + 40);
  text('press r to restart the game', width / 2, height / 2 + 80);
  
  image(images[0], width / 2 - 100, height / 2 - 100, 80, 80); 
  image(imgGirl, width / 2, height / 2 - 100, 80, 80);
  image(images[1], width / 2 + 100, height / 2 - 100, 80, 80);
}

function EndScreen() {
  bgMusic.stop();
  gameoverMusic.play();
  textSize(15);
  fill(50, 50, 50);
  text('oh no.. game over - aliens dont understand what s going on', width / 2, height / 2);
  textSize(15);
  text(`Final Score: ${score}`, width / 2, height / 2 + 40);
  text('press r to restart', width / 2, height / 2 + 80);
}

function createCreatures() {
  if (millis() - lastCreateTime > creatureInterval) {
    let creature = {
      x: random(50, width - 50),
      y: random(50, height - 50),
      type: random([0, 1]), // 0 for jellyfish, 1 for robot
      vx: random(-2, 2), // Random x velocity
      vy: random(-2, 2)  // Random y velocity
    };
    creatures.push(creature);
    lastCreateTime = millis();
  }
}


function createBombs() {
  // Spawn bombs at intervals of 2 seconds
  if (millis() - lastBombTime > createBomb) {
    let bomb = {
      x: random(50, width - 50),
      y: random(50, height - 50),
    };
    bombs.push(bomb);
    lastBombTime = millis();
  }
}

function displayPlayer() {
  image(imgGirl, player.x, player.y, 50, 50);
}

function updateAndDisplayCreatures() {
  for (let i = creatures.length - 1; i >= 0; i--) {
    let creature = creatures[i];
    creature.x += creature.vx;
    creature.y += creature.vy;
    
   // Bounce creature off the edges of the canvas
    if (creature.x < 25 || creature.x > width - 25) creature.vx *= -1;
    if (creature.y < 25 || creature.y > height - 25) creature.vy *= -1;
    
    // Display creature
    image(images[creature.type], creature.x, creature.y, 50, 50);
  }
}

function updateAndDisplayBombs() {
  for (let i = bombs.length - 1; i >= 0; i--) {
    let bomb = bombs[i];
    image(imgBomb, bomb.x, bomb.y, 40, 40); // Display bomb
  }
}

function girlMove() {
  if (keyIsDown(UP_ARROW) && player.y > 0) player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW) && player.y < height) player.y += player.speed;
  if (keyIsDown(LEFT_ARROW) && player.x > 0) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW) && player.x < width) player.x += player.speed;
}

function checkCollisions() {
  for (let i = creatures.length - 1; i >= 0; i--) {
    let creature = creatures[i];
    let d = dist(player.x, player.y, creature.x, creature.y);
    if (d < 25) { // Catching range
      creatures.splice(i, 1);
      score++;
      alienSound.play();
    }
  }
}

function checkBombCollisions() {
  for (let i = bombs.length - 1; i >= 0; i--) {
    let bomb = bombs[i];
    let d = dist(player.x, player.y, bomb.x, bomb.y);
    if (d < 25) { // Collision range for bombs
      bombs.splice(i, 1); // Remove bomb after collision
      score = max(0, score - 1); // Decrease score, but don't go below 0
      bombSound.play();
    }
  }
}

function keyPressed() {
  if (gameState === 'start') {
    gameState = 'intro';
  } else if (gameState === 'intro') {
    gameState = 'playing';
    startTime = millis(); // Start the timer when the game begins
    bgMusic.loop();
  } else if (gameState === 'dialogue'){
    bgMusic.stop();
    dialogueMusic.loop();
    // Move to the next dialogue line
    if (dialogueIndex < dialogue.length - 1) {
      dialogueIndex++;
    } else {
      // End dialogue and switch to win screen
      gameState = 'win';
      dialogueMusic.stop();
      winMusic.play();
    }
  } else if ((gameState === 'end' || gameState === 'win') && key === 'r') {
    resetGame();
  }
}

function resetGame() {
  score = 0;           // Reset score
  creatures = [];      // Clear creatures array
  bombs = []
  textY = 500;
  player.x = width / 2; // Reset player position
  player.y = height / 2;
  dialogueIndex = 0;    // Reset dialogue index
  startTime = millis(); // Reset timer
  lastBombTime = millis ();
  bgMusic.stop();
  alienSound.stop();
  bombSound.stop();
  winMusic.stop();
  gameState = 'start'; // Reset to start screen
}

//photocredit 
//girl: https://pngtree.com/element/down?id=NzMyNTU3Nw==&type=1&time=1731164730&token=NjcwMWM3OWRiOGY2ZWIxYjA1OGEwYjk1ZDZmMTllMjU=&t=0
//bomb: https://www.rawpixel.com/image/6287121/png-public-domain-black
//robot: https://pngtree.com/so/futuristic-robot
//desert photo generated by chatGPT 
//ellyfish: https://www.deviantart.com/beastfan2022/art/Jeff-Wayne-Martian-Jellyfish-Machine-969182432

//music credit all from epidemic sound
//bgm: https://www.epidemicsound.com/track/EjormDxohi/
//bomb: https://www.epidemicsound.com/sound-effects/tracks/9fe0728a-a52a-48f7-b316-8f3e58f424c1/
//robot: https://www.epidemicsound.com/sound-effects/tracks/0a84834d-d860-433a-89ff-7273d9370a01/
//dialogue: https://www.epidemicsound.com/sound-effects/tracks/72874456-8245-499a-87e8-8d04760e533d/
//gameover: https://www.epidemicsound.com/sound-effects/tracks/da83c15a-8daa-4a5a-930f-930c42a9355d/
