(function () {
  'use strict';
  navigator.getUserMedia = ( navigator.getUserMedia 
                          || navigator.webkitGetUserMedia 
                          || navigator.mozGetUserMedia
                           )
  var imageLoader = new AssetManager()
    , imagePaths  = { negative: './img/negative.png'
                    , polaroid: './img/polaroid.png'
                    }

  imageLoader.queueDownload(imagePaths.negative)
  imageLoader.queueDownload(imagePaths.polaroid)
  imageLoader.downloadAll(function() {
    function imageOverlay (path) {
      return function() {
                var oldImage = canvas.toData
                context.clearRect(0,0, videoWidth, videoHeight)
                context.drawImage(currentSnap, 0,0)
                var image = imageLoader.getAsset(path)
                context.drawImage(image, 0,0)
             }
    }

    var negativeEvent = imageOverlay(imagePaths.negative)
      , polaroidEvent = imageOverlay(imagePaths.polaroid)

    negativeButton.addEventListener('click', negativeEvent, false)
    polaroidButton.addEventListener('click', polaroidEvent, false)
  })

  var video          = document.getElementById('video')
    , canvas         = document.getElementById('canvas')
    , snapShotButton = document.getElementById('snapShotButton')
    , drawButton     = document.getElementById('drawButton')
    , eraseButton    = document.getElementById('eraseButton')

  var context            = canvas.getContext('2d')
    , localMediaStream   = null
    , currentSnap        = new Image() 
    , videoWidth         = 640
    , videoHeight        = 480
    , previousX          = 0
    , previousY          = 0
    , canvasMouseDown    = null
    , canvasMouseMove    = null
    , canvasMouseRelease = null
    , videoSettings      = { video: { mandatory: { maxWidth : videoWidth
                                                 , maxHeight : videoHeight
                                                 , minWidth : videoWidth
                                                 , minHeight : videoHeight
                                                 }
                                    }
                           }
  
  video.width   = videoWidth
  video.height  = videoHeight
  canvas.width  = videoWidth
  canvas.height = videoHeight
  drawButton.disabled = false
  eraseButton.disabled = false
  function snapShot () {
    if (localMediaStream) {
      context.clearRect(0,0, videoWidth, videoHeight)
      context.drawImage(video, 0, 0)
      currentSnap.src = canvas.toDataURL()
    }
  }
  
  function errorCallback (e) { console.log('Error: ', e) }

  function successCallback (stream) {
        if (window.URL) {
          video.src = window.URL.createObjectURL(stream)
        }
        else {
          video.src = stream
        }
        localMediaStream = stream
        video.play()
  }

  function getWidthRangeValue () {
    return document.getElementById('lineWidth').value
  }
  function getColor () {
    return document.getElementById('colorPicker').value
  }

  function getRectMargins () {
    var rect = canvas.getBoundingClientRect()

    return { left : rect.left
           , top : rect.top
           }
  }

  function drawButtonEvent () {
    var mouseDown = false

    drawButton.disabled  = true
    eraseButton.disabled = false

    function lineDraw (x, y, draw) {
          x -= getRectMargins().left
          y -= getRectMargins().top
          if (draw) {
            context.beginPath()
            context.strokeStyle = getColor()
            context.lineCap = 'round'
            context.lineWidth = getWidthRangeValue()
            context.moveTo(previousX, previousY)
            context.lineTo(x, y)
            context.stroke()
          }
          previousX = x
          previousY = y
    }
    function drawMouseDown (event) {
      lineDraw(event.pageX, event.pageY, mouseDown)
      mouseDown = true
    }
    function drawMouseMove (event) {
      lineDraw(event.pageX, event.pageY, mouseDown)
    }
    function drawMouseRelease () {
      mouseDown = false 
      context.closePath()
    }

    changeEvents([drawMouseDown, drawMouseMove, drawMouseRelease])
  }

  function eraseButtonEvent () {
    var mouseDown = false
    drawButton.disabled = false
    eraseButton.disabled = true

    function clear (x, y, erase) {
      x -= getRectMargins().left
      y -= getRectMargins().top
      if (clear) {
        context.beginPath()
        context.arc(x, y, getWidthRangeValue(), 0, Math.PI * 2)
        context.clip()
        context.clearRect(0, 0, videoWidth, videoHeight)
      }
    }

    function eraseDownEvent (event) {
      mouseDown = true
      clear(event.pageX, event.pageY, mouseDown)
    }

    function eraseMoveEvent (event) {
      clear(event.pageX, event.pageY, mouseDown)
    }

    function eraseReleaseEvent (event) {
      mouseDown = false
      context.closePath()
    }

    changeEvents([eraseDownEvent, eraseMoveEvent, eraseReleaseEvent])
  }

  function changeEvents (arrayOfNewEvents) {
    console.log(eraseButton.click === eraseButtonEvent)
    console.log(canvasMouseDown);
    canvas.removeEventListener('mousedown', canvasMouseDown)
    canvas.removeEventListener('mousemove', canvasMouseMove)
    canvas.removeEventListener('mouseup', canvasMouseRelease)
    canvas.removeEventListener('mouseleave', canvasMouseRelease)
    canvasMouseDown = arrayOfNewEvents[0]
    canvasMouseMove = arrayOfNewEvents[1]
    canvasMouseRelease = arrayOfNewEvents[2]
    console.log(canvasMouseDown)
    canvas.addEventListener('mousedown', canvasMouseDown)
    canvas.addEventListener('mousemove', canvasMouseMove)
    canvas.addEventListener('mouseup', canvasMouseRelease)
    canvas.addEventListener('mouseleave', canvasMouseRelease)
  }

  drawButton.addEventListener('click', drawButtonEvent)
  eraseButton.addEventListener('click', eraseButtonEvent)
  snapButton.addEventListener('click', snapShot)
  navigator.getUserMedia(videoSettings, successCallback, errorCallback)

})()