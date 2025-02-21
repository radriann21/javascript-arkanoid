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
    const sound = new Audio('./sounds/paddle.wav');
    
    if (this.x + this.radius > canvasW || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
      sound.play();
    }
  
    if (
      this.y + this.radius > paddle.y &&
      this.x + this.radius > paddle.x &&
      this.x - this.radius < paddle.x + paddle.width
    ) {
      const collidePoint = this.x - (paddle.x + paddle.width / 2);
      const normalizedCollidePoint = collidePoint / (paddle.width / 2);
  
      this.speedX = normalizedCollidePoint * 5; 
      this.speedY = -this.speedY;
  
      sound.play();
    }
  
    if (this.y - this.radius < 0) {
      this.speedY = -this.speedY;
      sound.play();
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
    // Crear un degradado lineal para el paddle
    const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
    gradient.addColorStop(0, '#FFD700'); // Amarillo dorado
    gradient.addColorStop(0.5, '#FFA500'); // Naranja claro
    gradient.addColorStop(1, '#FF4500'); // Naranja oscuro

    // Dibujar el cuerpo principal del paddle con el degradado
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Agregar un borde al paddle
    ctx.strokeStyle = '#8B0000'; // Rojo oscuro para el borde
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Agregar detalles visuales (líneas decorativas)
    ctx.beginPath();
    ctx.moveTo(this.x + 10, this.y + this.height / 2); // Línea izquierda
    ctx.lineTo(this.x + this.width - 10, this.y + this.height / 2); // Línea derecha
    ctx.strokeStyle = '#FFFFFF'; // Blanco para las líneas
    ctx.lineWidth = 1;
    ctx.stroke();

    // Agregar un pequeño círculo en el centro del paddle para darle un toque futurista
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF'; // Blanco para el círculo
    ctx.fill();
  }

  paddleCollisions(canvasW) {
    if (this.x < 0) {
      this.x = 0
    } else if (this.x + this.width > canvasW) {
      this.x = canvasW - this.width
    }
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  movePaddle() {
    document.addEventListener('keydown', (evt) => {
      switch (evt.key) {
        case 'ArrowLeft':
          this.moveLeft()
          break
        case 'ArrowRight':
          this.moveRight()
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