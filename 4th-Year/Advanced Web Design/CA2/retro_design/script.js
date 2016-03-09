"use strict";

// From: http://stackoverflow.com/questions/22003491/animating-canvas-to-look-like-tv-noise
var bg = document.getElementById('bg-canvas'),
ctx = bg.getContext('2d');
bg.width = window.innerWidth
bg.height = window.innerHeight
for (var i = 0; i < bg.height; i++) {
    if (i%2 == 0) {
        ctx.beginPath()
        ctx.moveTo(0,i* 1.5)
        ctx.lineTo(bg.width, i* 1.5)
        ctx.strokeStyle = '#141414'
        ctx.stroke()
    }
}