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
    , canvasWrapper  = document.getElementById('canvasWrapper')
    , snapShotButton = document.getElementById('snapShotButton')
    , drawButton     = document.getElementById('drawButton')
    , eraseButton    = document.getElementById('eraseButton')
    , undoButton     = document.getElementById('undoButton')
    , textButton     = document.getElementById('textButton')

  var context            = canvas.getContext('2d')
    , localMediaStream   = null
    , currentSnap        = new Image() 
    , videoWidth         = 640
    , videoHeight        = 480
    , previousX          = 0
    , previousY          = 0
    , mouseX             = 0
    , mouseY             = 0
    , mouseDown          = false
    , globalComposite    = 'source-over'
    , previousCommands   = []
    , charArray          = []
    , videoSettings      = { video: { mandatory: { maxWidth : videoWidth
                                                 , maxHeight : videoHeight
                                                 , minWidth : videoWidth
                                                 , minHeight : videoHeight
                                                 }
                                    }
                           }
  
  video.width   = videoWidth
  video.height  = videoHeight
  canvasWrapper.width = videoWidth
  canvasWrapper.height = videoHeight
  canvas.width = videoWidth
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

  function lineDraw (x, y, globalComposite, draw) {
    x -= getRectMargins().left
    y -= getRectMargins().top
    if (draw) {
      context.beginPath()
      context.globalCompositeOperation = globalComposite
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

  function drawButtonEvent () {
    removeTextEvents()
    globalComposite      = 'source-over'
    drawButton.disabled  = true
    eraseButton.disabled = false
  }

  function eraseButtonEvent () {
    removeTextEvents()
    globalComposite      = 'destination-out'
    drawButton.disabled  = false
    eraseButton.disabled = true
  }

  function undoButtonEvent () {
    removeTextEvents()
    context.clearRect(0, 0, videoWidth, videoHeight)
    var image = new Image()

    image.onload = function() {
      if (image.src !== '') context.drawImage(image, 0, 0)
    }
    previousCommands.pop()
    image.src = previousCommands.pop() || ''
  }

  function addTextEvents () {
    textButton.disabled = true
    canvasWrapper.addEventListener('click', textClickEvent)
    canvasWrapper.addEventListener('onkeypress', textKeyPressEvent)

  }

  function removeTextEvents () {
    if (textButton.disabled) {
      textButton.disabled = false
      canvasWrapper.removeEventListener('click', textClickEvent)
      canvasWrapper.removeEventListener('keypress', textKeyPressEvent)

      canvas.addEventListener('mousedown', canvasMouseDown)
      canvas.addEventListener('mousemove', canvasMouseMove)
      canvas.addEventListener('mouseup', canvasMouseUp)
      canvas.addEventListener('mouseleave', canvasMouseRelease)
    }
  }

  function canvasMouseDown (event) {
    lineDraw(event.pageX, event.pageY, globalComposite, mouseDown)
    mouseDown = true
  }
  function canvasMouseMove (event) {
    lineDraw(event.pageX, event.pageY, globalComposite, mouseDown)
  }
  function canvasMouseRelease () {
    mouseDown = false
    context.closePath()
  }

  function canvasMouseUp () {
    if (mouseDown) {
      previousCommands.push(canvas.toDataURL())
    }
    canvasMouseRelease()
  }

  function textClickEvent (event) {
    console.log('message1')
    var rect = getRectMargins()
    mouseX = event.pageX - rect.left
    mouseY = event.pageY - rect.top
    charArray = []
  }

  function textKeyPressEvent (event) {
    console.log('message');
    var character = String.fromCharCode(event.which)
      , width = mouseX
    if (charArray.length > 0) {
     charArray.forEach(function (singleChar) {
       width += context.measureText(singleChar).width
     }) 
    }
    context.fillText(character, width+10, mouseY)
    charArray.push(character)
  }


  canvas.addEventListener('mousedown', canvasMouseDown)
  canvas.addEventListener('mousemove', canvasMouseMove)
  canvas.addEventListener('mouseup', canvasMouseUp)
  canvas.addEventListener('mouseleave', canvasMouseRelease)
  drawButton.addEventListener('click', drawButtonEvent)
  eraseButton.addEventListener('click', eraseButtonEvent)
  undoButton.addEventListener('click', undoButtonEvent)
  textButton.addEventListener('click', addTextEvents)
  snapButton.addEventListener('click', snapShot)
  navigator.getUserMedia(videoSettings, successCallback, errorCallback)
  drawButtonEvent()

})()