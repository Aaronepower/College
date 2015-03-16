function ParticleSystem (canvas) {
  this.canvas = canvas
  this.context = this.canvas.getContext("2d")
  this.particles = []
  this.tick = 0
}

ParticleSystem.prototype.start = function () {
  this.frameID = window.requestAnimationFrame(this.loop(this.canvas,this.context))
}

ParticleSystem.prototype.loop = function (canvas, context) {
  return function loop() {
    console.log('working')
    window.requestAnimationFrame(loop)
    context.clearRect(0,0,canvas.width,canvas.height) 

    if(this.tick % 10 == 0) {
      if(this.particles.length < 100) {
        this.particles.push(new Particle(Math.random()*canvas.width, 0, 2+Math.random()*3, 5+Math.random()*5))
      }
    }

    for (var i in this.particles) {
      this.particles[i].update()
      this.particles[i].kill()
      this.particles[i].draw(context)
    }
    this.tick++ 
  }
}

ParticleSystem.prototype.stop = function () {
 window.cancelAnimationFrame(this.frameID) 
}
