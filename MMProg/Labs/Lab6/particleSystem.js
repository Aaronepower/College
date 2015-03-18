function ParticleSystem (canvas) {
  this.canvas = canvas
  this.context = canvas.getContext("2d")
  this.particles = []
  this.tick = 0
}

ParticleSystem.prototype.start = function () {
  if (this.frameID) {
    this.stop()
  }
  this.frameID = window.requestAnimationFrame(loop)
  var vm = this
  function loop() {
    vm.frameID = window.requestAnimationFrame(loop)
    vm.context.clearRect(0,0,canvas.width,canvas.height) 

    if(vm.tick % 10 == 0) {
      if(vm.particles.length < 100) {
        vm.particles.push(new Particle())
      }
    }

    for (var i in vm.particles) {
      vm.particles[i].update()
      vm.particles[i].kill()
      vm.particles[i].draw(vm.context)
    }
    vm.tick++ 
  }
}



ParticleSystem.prototype.stop = function () {
  window.cancelAnimationFrame(this.frameID) 
}
