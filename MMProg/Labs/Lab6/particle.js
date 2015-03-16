function Particle (x, y, speed, radius) {
  this.x = x
  this.y = y
  this.speed = speed 
  this.velocity =  1+Math.random()*10
  this.radius = radius
  this.colour = getRandomColor()
}

Particle.prototype.update = function () {
  this.y += this.speed * this.velocity
}

Particle.prototype.kill = function () {
  if(this.y > canvas.height) {
    this.y = 0
    this.velocity = 1+Math.random()*10
    this.radius = 5+Math.random()*15
    this.colour = getRandomColor()
  }
}

Particle.prototype.draw = function (context) {
  
  context.beginPath()
  context.arc(this.x, this.y, this.radius, 0, Math.PI*2)
  context.closePath()
  context.fillStyle = this.colour
  context.fill()
}
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
