function Particle () {
  this.x = Math.random()*canvas.width
  this.y = 0
  this.speed = 2+Math.random()*50
  this.radius = 5+Math.random()*5
  this.colour = getRandomColor()
  this.shape = Math.random()
}

Particle.prototype.update = function () {
  this.y += this.speed 
}

Particle.prototype.kill = function () {
  if(this.y > canvas.height) {
    this.y = 0
    this.speed = 2+Math.random()*50
    this.radius = 5+Math.random()*15
    this.colour = getRandomColor()
    this.shape = Math.random()
  }
}

Particle.prototype.draw = function (context) {
  if (this.shape > .5) {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2)
    context.closePath()
    context.fillStyle = this.colour
    context.fill()
  } else {
    context.beginPath()
    context.rect(this.x, this.y, this.radius, this.radius)
    context.closePath()
    context.fillStyle = this.colour
    context.fill()
  }
}
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('')
    var color = '#'
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}
