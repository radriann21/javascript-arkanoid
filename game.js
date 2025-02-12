export class Canvas {
  constructor(canvas, width, height) {
    this.canvas = canvas
    this.width = width
    this.height = height
  }

  getContext() {
    return this.canvas.getContext('2d')
  }

  clearCanvas(ctx) {
    ctx.clearRect(0, 0, this.width, this.height)
  }
}


export class Ball {
  constructor(x, y, radius, color, speedX, speedY) {
    this.x = x,
    this.y = y,
    this.radius = radius,
    this.color = color,
    this.speedX = speedX,
    this.speedY = speedY
  }

  drawBall(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  moveBall() {
    this.x += this.speedX
    this.y += this.speedY
  }
}


export class Paddle {
  constructor(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.speed = 20
    this.movePaddle()
  }

  drawPaddle(ctx) {
    ctx.beginPath()
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.fillStyle = this.color
    ctx.closePath()
  }

  movePaddle() {
    document.addEventListener('keydown', (evt) => {
      switch(evt.key) {
        case 'ArrowLeft': 
          this.x -= this.speed
          break
        case 'ArrowRight': 
          this.x += this.speed
          break
        default:
          break
      }
    })
  }
}