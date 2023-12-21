// Game

// Canvas
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let arrowupPressed = false;
let arrowdownPressed = false;
let arrowrightPressed = false;
let arrowleftPressed = false;
let spacePressed = false;
let keyrPressed = false;

// Images
let personImg = document.createElement("img");
personImg.src = "img/pixelperson.png";
let flagImg = document.createElement("img");
flagImg.src = "img/finishflag.png";
let kingImg = document.createElement("img");
kingImg.src = "img/king.png";

let wins = 0;
let losses = 0;

// Variables that resets when "R" pressed or tab is refreshed

let state;
let person;
let flag;
let redline;
let frameCount;
let platform1_1, platform1_2, platform1_3, platform1_4, platform1_5;
let platform2_0,
  platform2_1,
  platform2_2,
  platform2_3,
  platform2_4,
  platform2_5;
let platform3_1, platform3_2, platform3_3, platform3_4, platform3_5;
reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start") {
    drawStart();
  } else if (state === "gameon") {
    runGame();
  } else if (state === "gameover") {
    drawGameOver();
  } else if (state === "gamewon") {
    drawGameWon();
  }
  requestAnimationFrame(draw);
}

// Event stuff
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
  if (event.code === "ArrowRight") {
    arrowrightPressed = true;
  } else if (event.code === "ArrowLeft") {
    arrowleftPressed = true;
  } else if (event.code === "Space" && frameCount >= 40) {
    spacePressed = true;
  } else if (event.code === "KeyR") {
    keyrPressed = true;
  }

  // Start Game on Spacebar
  if (state === "start" && arrowrightPressed == true) {
    state = "gameon";
  }
  if (keyrPressed) {
    reset();
  }
}

function keyupHandler(event) {
  if (event.code === "ArrowRight") {
    arrowrightPressed = false;
  } else if (event.code === "ArrowLeft") {
    arrowleftPressed = false;
  } else if (event.code === "KeyR") {
    keyrPressed = false;
  }
}
