"use strict";
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

document.querySelector('#work').addEventListener('click', function(event) {
    let bgvid = document.querySelector('#bgvid')
    let videoSources = bgvid.querySelectorAll('.bgvideo')
    const videoTypes = ['.webm', '.mp4']
    for (var i = 0; i < videoSources.length; i++) {
        let video = videoSources[i]
        video.src = 'tv_turn_off'+videoTypes[i]
    }
    bgvid.loop = false
    bgvid.load()
    bgvid.play()
    document.querySelector('.landing').className += ' hidden'
})