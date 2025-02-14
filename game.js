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

  ballCollisions(canvasW, canvasH, paddle) {
    if (this.x + this.speedX > canvasW || this.x + this.speedX < 0) {
      this.speedX = -this.speedX
    }

    if (this.radius < paddle.width && this.y + this.radius > paddle.y && this.x + this.radius > paddle.x && this.x + this.radius < paddle.x + paddle.width) {
      this.speedY = -this.speedY
    }
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

  paddleCollisions(canvasW) {
    if (this.x < 0) {
      this.x = 0
    } else if (this.x + this.width > canvasW) {
      this.x = canvasW - this.width
    }
  }

  movePaddle() {
    document.addEventListener('keydown', (evt) => {
      switch (evt.key) {
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

export class Brick {
  constructor(x, y, width, height, color) {
    this.x = x,
    this.y = y,
    this.width = width,
    this.height = height,
    this.color = color
  }

  drawBrick(ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.closePath()
  }

  isColliding(ball) {
    return (
      ball.x + ball.radius > this.x &&
      ball.x - ball.radius < this.x + this.width &&
      ball.y + ball.radius > this.y &&
      ball.y - ball.radius < this.y + this.height
    );
  }
}