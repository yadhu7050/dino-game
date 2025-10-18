const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;
let isGameOver = false;
let gameSpeed = 1.5; // seconds

document.addEventListener("keydown", function (event) {
  if ((event.code === "Space" || event.key === "ArrowUp") && !isJumping && !isGameOver) {
    jump();
  } else if (event.code === "Enter" && isGameOver) {
    restartGame();
  }
});

function jump() {
  isJumping = true;
  dino.classList.add("jump");
  setTimeout(() => {
    dino.classList.remove("jump");
    isJumping = false;
  }, 500);
}

function endGame() {
  isGameOver = true;
  cactus.style.animationPlayState = "paused"; // Stop cactus movement
  scoreDisplay.innerText = `💀 Game Over! Final Score: ${score}\nPress Enter to Restart`;
}

function restartGame() {
  isGameOver = false;
  score = 0;
  cactus.style.animation = `cactusMove ${gameSpeed}s infinite linear`;
  cactus.style.animationPlayState = "running";
  scoreDisplay.innerText = "Score: 0";
}

let checkCollision = setInterval(() => {
  if (isGameOver) return;

  let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

  // Collision condition
  if (cactusLeft < 90 && cactusLeft > 50 && dinoBottom < 40) {
    endGame();
  } else {
    score++;
    scoreDisplay.innerText = "Score: " + score;
  }
}, 100);
