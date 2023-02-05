window.addEventListener('load', function () {

  /**@type {HTMLCanvasElement} */
  const canvas = document.getElementById('canvas1')

  /**@type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext('2d')

  canvas.width  = 1280
  canvas.height = 720

  ctx.fillStyle   = 'white'
  ctx.lineWidth   = 3
  ctx.strokeStyle = 'white'

  class Player {
    constructor(game){
      this.game = game
      this.collisionX     = this.game.width  * .5
      this.collisionY     = this.game.height * .5
      this.collisionRadio = 50
      
      this.speedX = 0
      this.speedY = 0

      this.dx = 0
      this.dy = 0

      this.speedModifier = 2
    }

    draw(context){
      context.beginPath()
      context.arc(this.collisionX, this.collisionY, this.collisionRadio, 0, (2 * Math.PI))

      context.save()
      context.globalAlpha = .5
      context.fill()
      context.restore()
      context.stroke()

      context.beginPath()
      context.moveTo(this.collisionX,   this.collisionY)
      context.lineTo(this.game.mouse.x, this.game.mouse.y)
      context.stroke()

      /* console.log({x: this.collisionX,   y: this.collisionY});
      console.log({x: this.game.mouse.x, y: this.game.mouse.y}); */
    }

    update(){

      this.dx = this.game.mouse.x - this.collisionX //dx es la (distancia) diferencia entre el mouse y el centro de colisión dentro del eje X
      this.dy = this.game.mouse.y - this.collisionY

      // Para una velocidad CONSTANTE se toma como valor de ddistancia la hipotenusa entre el eje X e Y (velocidad constante)
      // distancia entre lasCONSTANTE dy y dx (hipotenusa)
      const distance = Math.hypot(this.dy, this.dx)

      if (distance > this.speedModifier){
        this.speedX = this.dx / distance || 0
        this.speedY = this.dy / distance || 0

      }else{
        this.speedX = 0
        this.speedY = 0
      }
      
      this.collisionX += this.speedX * this.speedModifier // el speedModifier aumenta la velocidad de desplazamiento
      this.collisionY += this.speedY * this.speedModifier
    }
  }


  class Obstacle{}

  class Game {
    constructor(canvas){
      this.canvas = canvas

      this.width  = this.canvas.width
      this.height = this.canvas.height

      this.player = new Player(this)

      this.mouse = {
        x: this.width * .5,
        y: this.height* .5, 
        pressed:false
      }

      canvas.addEventListener('mousedown', e => {
        this.mouse.x = e.offsetX
        this.mouse.y = e.offsetY
        this.mouse.pressed = true
      })

      canvas.addEventListener('mouseup', e => {
        this.mouse.x = e.offsetX
        this.mouse.y = e.offsetY
        this.mouse.pressed = false
      })

      canvas.addEventListener('mousemove', e => {

        if(this.mouse.pressed){
          this.mouse.x = e.offsetX
          this.mouse.y = e.offsetY
        }

        //console.log(this.mouse);
      })
    }

    render(context){
      this.player.draw(context)
      this.player.update(context)
    }
  }

  const game = new Game(canvas)
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height )
    game.render(ctx)

    window.requestAnimationFrame(animate)
  }

  animate()

})
