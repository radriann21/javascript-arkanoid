import { Paddle, Canvas, Ball } from './game.js'

const canvas = document.getElementById('canvas')
canvas.width = 580
canvas.height = 550

const canvasObj = new Canvas(canvas, canvas.width, canvas.height)
const ctx = canvasObj.getContext()

const ball = new Ball(canvas.width / 2, canvas.height - 80, 10, '#fff', 3, -3)
const paddle = new Paddle((canvas.width / 2) - 50, canvas.height - 60, 100, 20, '#fff')

function draw() {
  canvasObj.clearCanvas(ctx)
  ball.drawBall(ctx)
  ball.moveBall()
  ball.ballCollisions(canvas.width, canvas.height, paddle)
  paddle.paddleCollisions(canvas.width)
  paddle.drawPaddle(ctx)
  requestAnimationFrame(draw)
}

draw()

