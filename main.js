import { Paddle, Canvas, Ball } from './game.js'

const canvas = document.getElementById('canvas')
canvas.width = 650
canvas.height = 500

const canvasObj = new Canvas(canvas, canvas.width, canvas.height)
const ctx = canvasObj.getContext()

const ball = new Ball(canvas.width / 2, canvas.height - 40, 10, '#fff', 2, -2)
const paddle = new Paddle((canvas.width / 2) - 40, canvas.height - 20, 100, 100, '#fff')

function draw() {
  canvasObj.clearCanvas(ctx)
  ball.drawBall(ctx)
  // ball.moveBall()
  paddle.drawPaddle(ctx)
  requestAnimationFrame(draw)
}

draw()

