const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const gameOverText = document.getElementById("gameOverText");
const starsContainer = document.getElementById("stars");

let isJumping = false;
let score = 0;
let highScore = parseInt(localStorage.getItem('dinoHighScore')) || 0;
let isGameOver = false;
let gameSpeed = 2; // seconds

// Create stars
for (let i = 0; i < 30; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.width = Math.random() * 3 + 'px';
  star.style.height = star.style.width;
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 70 + '%';
  star.style.animationDelay = Math.random() * 3 + 's';
  starsContainer.appendChild(star);
}

highScoreDisplay.innerText = `High Score: ${highScore}`;

document.addEventListener("keydown", function (event) {
  if ((event.code === "Space" || event.key === "ArrowUp") && !isJumping && !isGameOver) {
    event.preventDefault();
    jump();
  } else if (event.code === "Enter" && isGameOver) {
    event.preventDefault();
    restartGame();
  }
});

// Touch support for mobile
document.addEventListener("touchstart", function(event) {
  if (!isJumping && !isGameOver) {
    jump();
  } else if (isGameOver) {
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
  if (isGameOver) return;
  
  isGameOver = true;
  cactus.classList.add("game-over");
  gameOverText.classList.add("show");
  
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('dinoHighScore', highScore);
    highScoreDisplay.innerText = `High Score: ${highScore} 🎉`;
  }
}

function restartGame() {
  isGameOver = false;
  score = 0;
  gameOverText.classList.remove("show");
  cactus.classList.remove("game-over");
  cactus.style.animation = 'none';
  setTimeout(() => {
    cactus.style.animation = `cactusMove ${gameSpeed}s infinite linear`;
  }, 10);
  scoreDisplay.innerText = "Score: 0";
}

function checkCollision() {
  if (isGameOver) return;

  const dinoRect = dino.getBoundingClientRect();
  const cactusRect = cactus.getBoundingClientRect();

  // More accurate collision detection using bounding boxes
  const collision = !(
    dinoRect.right < cactusRect.left + 10 ||
    dinoRect.left > cactusRect.right - 10 ||
    dinoRect.bottom < cactusRect.top + 10 ||
    dinoRect.top > cactusRect.bottom
  );

  if (collision) {
    endGame();
  }
}

function updateScore() {
  if (!isGameOver) {
    score++;
    scoreDisplay.innerText = "Score: " + score;
    
    // Increase difficulty
    if (score % 100 === 0 && gameSpeed > 1) {
      gameSpeed -= 0.1;
      cactus.style.animation = `cactusMove ${gameSpeed}s infinite linear`;
    }
  }
}

// Check collision every 10ms for accuracy
setInterval(checkCollision, 10);

// Update score every 100ms
setInterval(updateScore, 100);