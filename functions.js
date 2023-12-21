// Functions

// Start screen
function drawStart() {
  drawMainComponents();
  drawPlatforms();
  // flag
  ctx.drawImage(flagImg, flag.x, flag.y);

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "white";
  ctx.fillText("PRESS RIGHT ARROW TO BEGIN", 110, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("USE ARROW KEYS & SPACEBAR TO MOVE", 170, 310);

  ctx.fillText("DON'T TOUCH THE", 245, 350);

  ctx.fillStyle = "red";
  ctx.fillText("REDLINE", 460, 350);
}

function runGame() {
  // Logic
  movePerson();
  movePlatforms();
  checkCollisions();

  // Draw
  drawGame();

  // Win count
  if (state == "gamewon") {
    wins = wins + 1;
  }

  // Loss count
  if (state == "gameover") {
    losses = losses + 1;
  }
}

function movePerson() {
  // Main keys for player movement
  if (spacePressed) {
    person.y += -5;
  }
  if (arrowrightPressed) {
    person.x += 5;
  }
  if (arrowleftPressed) {
    person.x += -5;
  }

  frameCount++;
  if (spacePressed && frameCount >= 40) {
    frameCount = 0;
    person.speed += -10;
  }

  console.log(frameCount);

  // Gravity
  if (spacePressed) {
    person.speed += -1;
  }
  if (person.speed <= -11) {
    person.speed = 2;
    spacePressed = false;
  }
  person.speed += person.accel;

  person.y += person.speed;
}
function movePlatforms() {
  // Redline

  redline.x += 5.25;
  if (arrowrightPressed && person.x >= 500) {
    redline.x += -5;
  } else if (arrowleftPressed && person.x <= 500) {
    redline.x += 5;
  }

  // Platforms

  // Side to side

  // Going Right
  if (person.x >= 500 && arrowrightPressed) {
    // Images
    person.x = 500;
    flag.x += -5;
    // Platfrom 1
    platform1_1.x += -5;
    platform1_2.x += -5;
    platform1_3.x += -5;
    platform1_4.x += -5;
    platform1_5.x += -5;
    // Platfrom 2
    platform2_0.x += -5;
    platform2_1.x += -5;
    platform2_2.x += -5;
    platform2_3.x += -5;
    platform2_4.x += -5;
    platform2_5.x += -5;
    // Platform 3
    platform3_1.x += -5;
    platform3_2.x += -5;
    platform3_3.x += -5;
    platform3_4.x += -5;
    platform3_5.x += -5;
  }
  // Going Left
  else if (person.x <= 500 && arrowleftPressed) {
    // Images
    person.x = 500;
    flag.x += 5;
    // platfrom 1
    platform1_1.x += 5;
    platform1_2.x += 5;
    platform1_3.x += 5;
    platform1_4.x += 5;
    platform1_5.x += 5;
    // Platfrom 2
    platform2_0.x += 5;
    platform2_1.x += 5;
    platform2_2.x += 5;
    platform2_3.x += 5;
    platform2_4.x += 5;
    platform2_5.x += 5;
    // Platform 3
    platform3_1.x += 5;
    platform3_2.x += 5;
    platform3_3.x += 5;
    platform3_4.x += 5;
    platform3_5.x += 5;
  }

  // Platfrom moving down
  if (person.x >= platform1_4.x && person.x >= 50) {
    // Images
    person.y += 1;
    flag.y += 1.5;
    // Platform 1
    platform1_1.y += 1.5;
    platform1_2.y += 1.5;
    platform1_3.y += 1.5;
    platform1_4.y += 1.5;
    platform1_5.y += 1.5;
    // Platfrom 2
    platform2_1.y += 1.5;
    platform2_2.y += 1.5;
    platform2_3.y += 1.5;
    platform2_4.y += 1.5;
    platform2_5.y += 1.5;
    // Platform 3
    platform3_1.y += 1.5;
    platform3_2.y += 1.5;
    platform3_3.y += 1.5;
    platform3_4.y += 1.5;
    platform3_5.y += 1.5;
  }
  // Stop it from moving down
  if (platform1_4.y >= 900) {
    // Images
    flag.y += -1.5;
    // Platfrom 1
    platform1_1.y += -1.5;
    platform1_2.y += -1.5;
    platform1_3.y += -1.5;
    platform1_4.y += -1.5;
    platform1_5.y += -1.5;
    // Platfrom 2
    platform2_1.y += -1.5;
    platform2_2.y += -1.5;
    platform2_3.y += -1.5;
    platform2_4.y += -1.5;
    platform2_5.y += -1.5;
    // Platform 3
    platform3_1.y += -1.5;
    platform3_2.y += -1.5;
    platform3_3.y += -1.5;
    platform3_4.y += -1.5;
    platform3_5.y += -1.5;
  }

  // Elevator
  if (redline.x >= 900) {
    redline.x = 900;
    platform2_0.y += -1;
    person.y += -1;
  }
  if (platform2_0.y <= 300) {
    redline.x += -10.6;
    platform2_0.y = 300;
  }
  if (platform2_0.y <= 300 && redline.x <= 700) {
    redline.h = cnv.height;
  }

  // Shrinking and sinking platfroms
  if (person.x <= platform2_2.x + platform2_2.w && person.y <= platform2_2.y) {
    // Shrink
    platform2_2.x += 0.4;
    platform2_2.w -= 0.8;
    // Sink
    platform2_2.y += 1.2;

    // Shrink
    platform2_3.x += 0.2;
    platform2_3.w -= 0.4;
    // Sink
    platform2_3.y += 0.6;

    // Shrink
    platform2_4.x += 0.4;
    platform2_4.w -= 0.8;
    // Sink
    platform2_4.y += 0.3;
  }

  // Flag moving away
  if (
    person.x <= platform2_5.x + platform2_5.w - 344 &&
    person.y <= platform2_5.y
  ) {
    flag.x -= 5.1;
  }
  if (flag.x <= platform2_5.x) {
    flag.x += 5.1;
  }
}

function checkCollisions() {
  // Ground
  if (person.y > 532) {
    person.y = 532;
  }

  // Collisions with platforms

  // Platform 1_1

  // Top
  if (
    person.y + person.h >= platform1_1.y &&
    person.y <= platform1_1.y &&
    person.x + person.w >= platform1_1.x &&
    person.x <= platform1_1.x + platform1_1.w
  ) {
    person.y = platform1_1.y - person.h;
  }
  // Left Side
  if (
    person.x + person.w >= platform1_1.x &&
    person.x <= platform1_1.x + platform1_1.w &&
    person.y >= platform1_1.y
  ) {
    person.x = platform1_1.x - person.w;
  }

  // Platfrom 1_2

  // Top
  if (
    person.y + person.h >= platform1_2.y &&
    person.y <= platform1_2.y &&
    person.x + person.w >= platform1_2.x &&
    person.x <= platform1_2.x + platform1_2.w
  ) {
    person.y = platform1_2.y - person.h;
  }

  // platfrom 1_3

  // Top
  if (
    person.y + person.h >= platform1_3.y &&
    person.y <= platform1_3.y &&
    person.x + person.w >= platform1_3.x &&
    person.x <= platform1_3.x + platform1_3.w
  ) {
    person.y = platform1_3.y - person.h;
  }

  // platfrom 1_4

  // Top
  if (
    person.y + person.h >= platform1_4.y &&
    person.y <= platform1_4.y &&
    person.x + person.w >= platform1_4.x &&
    person.x <= platform1_4.x + platform1_4.w
  ) {
    person.y = platform1_4.y - person.h;
  }

  // Left side and Right side
  if (
    person.x + person.w >= platform1_4.x &&
    person.x <= platform1_4.x + platform1_4.w / 2 &&
    person.y >= platform1_4.y
  ) {
    person.x = platform1_4.x - person.w;
  } else if (
    person.x + person.w >= platform1_4.x &&
    person.x <= platform1_4.x + platform1_4.w &&
    person.y >= platform1_4.y
  ) {
    person.x = platform1_4.x + platform1_4.w;
  }

  // platform 1_5

  // left Side
  if (
    person.x + person.w >= platform1_5.x &&
    person.x <= platform1_5.x + platform1_5.w / 2 &&
    person.y >= platform1_5.y
  ) {
    person.x = platform1_5.x - person.w;
  }

  // platform 2_0/Elevator

  // Top
  if (
    person.y + person.h >= platform2_0.y &&
    person.y <= platform2_0.y &&
    person.x + person.w >= platform2_0.x &&
    person.x <= platform2_0.x + platform2_0.w
  ) {
    person.y = platform2_0.y - person.h;
  }

  // platform 2_1

  // Top
  if (
    person.y + person.h >= platform2_1.y &&
    person.y <= platform2_1.y &&
    person.x + person.w >= platform2_1.x &&
    person.x <= platform2_1.x + platform2_1.w
  ) {
    person.y = platform2_1.y - person.h;
  }

  // // left and right Side
  if (
    person.x + person.w >= platform2_1.x &&
    person.x <= platform2_1.x + platform2_1.w / 2 &&
    person.y >= platform2_1.y &&
    person.y <= platform2_1.y + platform2_1.h
  ) {
    person.x = platform2_1.x - person.w;
  } else if (
    person.x + person.w >= platform2_1.x &&
    person.x <= platform2_1.x + platform2_1.w &&
    person.y >= platform2_1.y &&
    person.y <= platform2_1.y + platform2_1.h
  ) {
    person.x = platform2_1.x + platform2_1.w;
  }

  // platform 2_2

  // Top
  if (
    person.y + person.h >= platform2_2.y &&
    person.y <= platform2_2.y &&
    person.x + person.w >= platform2_2.x &&
    person.x <= platform2_2.x + platform2_2.w
  ) {
    person.y = platform2_2.y - person.h;
  }

  // platform 2_3

  // Top
  if (
    person.y + person.h >= platform2_3.y &&
    person.y <= platform2_3.y &&
    person.x + person.w >= platform2_3.x &&
    person.x <= platform2_3.x + platform2_3.w
  ) {
    person.y = platform2_3.y - person.h;
  }

  // platform 2_4

  // Top
  if (
    person.y + person.h >= platform2_4.y &&
    person.y <= platform2_4.y &&
    person.x + person.w >= platform2_4.x &&
    person.x <= platform2_4.x + platform2_4.w
  ) {
    person.y = platform2_4.y - person.h;
  }

  // platform 2_5

  // Top
  if (
    person.y + person.h >= platform2_5.y &&
    person.y <= platform2_5.y &&
    person.x + person.w >= platform2_5.x &&
    person.x <= platform2_5.x + platform2_5.w
  ) {
    person.y = platform2_5.y - person.h;
  }
  // Right side
  if (
    person.x + person.w >= platform2_5.x &&
    person.x <= platform2_5.x + platform2_5.w &&
    person.y >= platform2_5.y &&
    person.y <= platform2_5.y + platform2_5.h
  ) {
    person.x = platform2_5.x + platform2_5.w;
  }

  // Platfrom 3_1     <--- only needs top collision for all platform3_X

  // Top
  if (
    person.y + person.h >= platform3_1.y &&
    person.y <= platform3_1.y &&
    person.x + person.w >= platform3_1.x &&
    person.x <= platform3_1.x + platform3_1.w
  ) {
    gameOver();
  }

  // Platfrom 3_2

  // Top
  if (
    person.y + person.h >= platform3_2.y &&
    person.y <= platform3_2.y &&
    person.x + person.w >= platform3_2.x &&
    person.x <= platform3_2.x + platform3_2.w
  ) {
    gameOver();
  }

  // Platfrom 3_3

  // Top
  if (
    person.y + person.h >= platform3_3.y &&
    person.y <= platform3_3.y &&
    person.x + person.w >= platform3_3.x &&
    person.x <= platform3_3.x + platform3_3.w
  ) {
    gameOver();
  }

  // Platfrom 3_4

  // Top
  if (
    person.y + person.h >= platform3_4.y &&
    person.y <= platform3_4.y &&
    person.x + person.w >= platform3_4.x &&
    person.x <= platform3_4.x + platform3_4.w
  ) {
    gameOver();
  }

  // Platfrom 3_5

  // Top
  if (
    person.y + person.h >= platform3_5.y &&
    person.y <= platform3_5.y &&
    person.x + person.w >= platform3_5.x &&
    person.x <= platform3_5.x + platform3_5.w
  ) {
    gameOver();
  }

  // Flag
  if (
    person.x <= flag.x + flag.w &&
    person.y + person.h <= flag.y &&
    person.y + person.h >= flag.y
  ) {
    gameWon();
  }
  // Redline
  if (
    person.x <= redline.x + redline.w &&
    person.x + person.w >= redline.x &&
    person.y <= redline.y + redline.h
  ) {
    gameOver();
  }
}

function gameWon() {
  state = "gamewon";
}

function gameOver() {
  state = "gameover";
}

function drawGameWon() {
  drawMainComponents();
  drawPlatforms();
  ctx.drawImage(flagImg, flag.x, flag.y);

  // Game won text
  ctx.font = "40px consolas";
  ctx.fillStyle = "white";
  ctx.fillText("YOU WON!", 320, 200);
  ctx.fillText("PRESS R TO PLAY AGAIN", 190, 230);
}

function drawGameOver() {
  drawMainComponents();
  drawPlatforms();

  // Game over text
  ctx.font = "40px consolas";
  ctx.fillStyle = "white";
  ctx.fillText("YOU LOST!", 305, 200);
  ctx.drawImage(kingImg, 380, 100);
  ctx.fillText("PRESS R TO TRY AGAIN", 190, 230);

  ctx.drawImage(flagImg, flag.x, flag.y);
}

function drawGame() {
  drawMainComponents();
  drawPlatforms();
  ctx.drawImage(flagImg, flag.x, flag.y);
}

// Helper Function
function reset() {
  state = "start";
  person = {
    x: 200,
    y: 532,
    w: 45,
    h: 68,
    speed: 0,
    accel: 0.1,
  };
  flag = {
    x: -200,
    y: -400,
    w: 355,
    h: 142,
  };
  redline = {
    x: 0,
    y: 0,
    w: 15,
    h: cnv.height,
  };
  frameCount = 0;
  platform1_1 = {
    x: 600,
    y: 500,
    w: 350,
    h: cnv.height,
  };
  platform1_2 = {
    x: 1050,
    y: 400,
    w: 200,
    h: 20,
  };
  platform1_3 = {
    x: 1350,
    y: 300,
    w: 200,
    h: 20,
  };
  platform1_4 = {
    x: 1700,
    y: 200,
    w: cnv.width + 200,
    h: cnv.height,
  };
  platform1_5 = {
    x: 2900,
    y: -1000,
    w: cnv.width,
    h: cnv.height * 3,
  };
  // 2nd level
  platform2_0 = {
    x: 2700,
    y: 600,
    w: 200,
    h: 20,
  };
  platform2_1 = {
    x: 2100,
    y: -400,
    w: 600,
    h: 310,
  };
  platform2_2 = {
    x: 1600,
    y: -400,
    w: 400,
    h: 20,
  };
  platform2_3 = {
    x: 1100,
    y: -400,
    w: 400,
    h: 20,
  };
  platform2_4 = {
    x: 600,
    y: -400,
    w: 400,
    h: 20,
  };
  platform2_5 = {
    x: -3000,
    y: -400,
    w: 3500,
    h: 400,
  };
  // Red platforms
  platform3_1 = {
    x: -500,
    y: -420,
    w: 100,
    h: 20,
  };
  platform3_2 = {
    x: -900,
    y: -420,
    w: 100,
    h: 20,
  };
  platform3_3 = {
    x: -1300,
    y: -420,
    w: 100,
    h: 20,
  };
  platform3_4 = {
    x: -1700,
    y: -420,
    w: 100,
    h: 20,
  };
  platform3_5 = {
    x: -2100,
    y: -420,
    w: 100,
    h: 20,
  };
}

function drawPlatforms() {
  // Redline
  ctx.fillStyle = "rgb(255,0,0)";
  ctx.fillRect(redline.x, redline.y, redline.w, redline.h);
  if (redline.x >= platform1_4.x) {
    redline.h = 530;
  }

  // Platform 1
  ctx.fillStyle = "rgb(60,60,60)";
  ctx.fillRect(platform1_1.x, platform1_1.y, platform1_1.w, platform1_1.h);
  ctx.fillRect(platform1_2.x, platform1_2.y, platform1_2.w, platform1_2.h);
  ctx.fillRect(platform1_3.x, platform1_3.y, platform1_3.w, platform1_3.h);
  ctx.fillRect(platform1_4.x, platform1_4.y, platform1_4.w, platform1_4.h);
  ctx.fillRect(platform1_5.x, platform1_5.y, platform1_5.w, platform1_5.h);

  // Platform2
  ctx.fillRect(platform2_1.x, platform2_1.y, platform2_1.w, platform2_1.h);
  ctx.fillRect(platform2_2.x, platform2_2.y, platform2_2.w, platform2_2.h);
  ctx.fillRect(platform2_3.x, platform2_3.y, platform2_3.w, platform2_3.h);
  ctx.fillRect(platform2_4.x, platform2_4.y, platform2_4.w, platform2_4.h);
  ctx.fillRect(platform2_5.x, platform2_5.y, platform2_5.w, platform2_5.h);

  // Elevator
  ctx.fillStyle = "rgb(114,87,52)";
  ctx.fillRect(platform2_0.x, platform2_0.y, platform2_0.w, platform2_0.h);

  // Platform3
  ctx.fillStyle = "rgb(255,0,0";
  ctx.fillRect(platform3_1.x, platform3_1.y, platform3_1.w, platform3_1.h);
  ctx.fillRect(platform3_2.x, platform3_2.y, platform3_2.w, platform3_2.h);
  ctx.fillRect(platform3_3.x, platform3_3.y, platform3_3.w, platform3_3.h);
  ctx.fillRect(platform3_4.x, platform3_4.y, platform3_4.w, platform3_4.h);
  ctx.fillRect(platform3_5.x, platform3_5.y, platform3_5.w, platform3_5.h);
}

function drawMainComponents() {
  // Background
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "white";
  ctx.fillText("PERSONAL GAME PROJECT", 25, 35);

  ctx.font = "20px Consolas";
  ctx.fillText("WINS:" + wins, 620, 25);
  ctx.fillText("LOSSES:" + losses, 700, 25);

  // person
  ctx.drawImage(personImg, person.x, person.y);
}
