import { Paddle, Canvas, Ball, Brick } from './game.js'

const canvas = document.getElementById('canvas')
const btnStart = document.getElementById('start-btn')
const initMessage = document.getElementById('init')
const scoreMessage = document.getElementById('score')

canvas.height = 550
canvas.width = 580

const canvasObj = new Canvas(canvas, canvas.width, canvas.height)
const ctx = canvasObj.getContext()
const ball = new Ball(canvas.width / 2, canvas.height - 80, 6, '#000', 3, -3)
const paddle = new Paddle((canvas.width / 2) - 50, canvas.height - 60, 100, 20, '#000')

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3', '#33FFF6', '#FF9B33', '#A533FF']
const bricks = []

let gameRunning = false
let score = 0

function createBricks() {
  const c = 9; 
  const r = 5;  
  const brickWidth = 50;
  const brickHeight = 20;
  const spacing = 10; 

  const totalWidth = c * brickWidth + (c - 1) * spacing;
  const totalHeight = r * brickHeight + (r - 1) * spacing;

  const marginX = Math.max(0, (canvas.width - totalWidth) / 2);
  const marginY = Math.max(0, (250 - totalHeight) / 2);

  for (let i = 0; i < c; i++) {
    for (let j = 0; j < r; j++) {
      const x = marginX + i * (brickWidth + spacing);
      const y = marginY + j * (brickHeight + spacing);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const brick = new Brick(x, y, brickWidth, brickHeight, color);
      bricks.push(brick);
    }
  }
}
createBricks()

function drawBricks() {
  if (bricks.length === 0) return 
  bricks.forEach(brick => {
    if (!brick.isDestroyed) {
      brick.drawBrick(ctx)
      if (brick.isColliding(ball)) {
        const destroySound = new Audio('./sounds/block.wav')
        destroySound.play()
        ball.speedY = -ball.speedY
        brick.isDestroyed = true
        score += 20
        scoreMessage.textContent = score
      }
    }
  })
}

function checkGameOver(draw) {
  if (ball.y + ball.radius > canvas.height) {
    gameRunning = false
    initMessage.style.display = 'flex'
    scoreMessage.textContent = 0
    cancelAnimationFrame(draw)
    const gameOverAudio = new Audio('./sounds/gameover.wav')
    gameOverAudio.play()
  }
}

function resetGame() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 80;
  ball.speedX = 3;
  ball.speedY = -3;

  paddle.x = (canvas.width / 2) - 50;

  bricks.length = 0; 
  createBricks();

  score = 0;
  scoreMessage.textContent = score;

  gameRunning = true;
}

function draw() {
  if (!gameRunning) return
  canvasObj.clearCanvas(ctx)
  ball.drawBall(ctx)
  ball.moveBall()
  ball.ballCollisions(canvas.width, canvas.height, paddle)
  paddle.paddleCollisions(canvas.width)
  paddle.drawPaddle(ctx)
  drawBricks()
  checkGameOver(draw)
  requestAnimationFrame(draw)
}

btnStart.addEventListener('click', () => {
  const startAudio = new Audio('./sounds/start.wav')
  startAudio.play()
  initMessage.style.display = 'none'
  gameRunning = true
  resetGame()
  draw()
})

