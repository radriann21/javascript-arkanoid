import { Paddle, Canvas, Ball, Brick } from './game.js'

const canvas = document.getElementById('canvas')
canvas.width = 580
canvas.height = 550

const canvasObj = new Canvas(canvas, canvas.width, canvas.height)
const ctx = canvasObj.getContext()

const ball = new Ball(canvas.width / 2, canvas.height - 80, 6, '#000', 3, -3)
const paddle = new Paddle((canvas.width / 2) - 50, canvas.height - 60, 100, 20, '#000')

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3', '#33FFF6', '#FF9B33', '#A533FF']
const bricks = []

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
        ball.speedY = -ball.speedY
        brick.isDestroyed = true
      }
    }
  })
}

function draw() {
  canvasObj.clearCanvas(ctx)
  ball.drawBall(ctx)
  ball.moveBall()
  ball.ballCollisions(canvas.width, canvas.height, paddle)
  paddle.paddleCollisions(canvas.width)
  paddle.drawPaddle(ctx)
  drawBricks()
  requestAnimationFrame(draw)
}

// draw()

