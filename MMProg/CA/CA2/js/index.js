(function () {
  'use strict';

  var video           = document.getElementById('userMediaVideo')
    , userMediaCanvas = document.getElementById('userMediaCanvas')
    , filterCanvas    = document.getElementById('filterCanvas')
    , textCanvas      = document.getElementById('textCanvas')
    , drawingCanvas   = document.getElementById('drawingCanvas')
    , canvasWrapper   = document.getElementById('canvasWrapper')
    , drawButton      = document.getElementById('drawButton')
    , eraseButton     = document.getElementById('eraseButton')
    , undoButton      = document.getElementById('undoButton')

  var drawingContext   = drawingCanvas.getContext('2d')
    , previousX        = 0
    , previousY        = 0
    , mouseDown        = false
    , globalComposite  = 'source-over'
    , previousCommands = []
  
  video.width            = videoWidth
  video.height           = videoHeight
  canvasWrapper.width    = videoWidth
  canvasWrapper.height   = videoHeight
  userMediaCanvas.width  = videoWidth
  userMediaCanvas.height = videoHeight
  filterCanvas.width     = videoWidth
  filterCanvas.height    = videoHeight
  textCanvas.width       = videoWidth
  textCanvas.height      = videoHeight
  drawingCanvas.width    = videoWidth
  drawingCanvas.height   = videoHeight

  snapButton.disabled = true
  drawButton.disabled = false
  eraseButton.disabled = false

  function getWidthRangeValue () {

    return document.getElementById('lineWidth').value
  }

  function getColor () {

    return document.getElementById('colorPicker').value
  }



  function lineDraw (x, y, globalComposite, draw) {
    x -= getRectMargins().left
    y -= getRectMargins().top
    if (draw) {
      drawingContext.beginPath()
      drawingContext.globalCompositeOperation = globalComposite
      drawingContext.strokeStyle = getColor()
      drawingContext.lineCap = 'round'
      drawingContext.lineWidth = getWidthRangeValue()
      drawingContext.moveTo(previousX, previousY)
      drawingContext.lineTo(x, y)
      drawingContext.stroke()
    }
    previousX = x
    previousY = y
  }

  function drawButtonEvent () {
    globalComposite      = 'source-over'
  }

  function eraseButtonEvent () {
    globalComposite      = 'destination-out'
  }

  function undoButtonEvent () {
    drawingContext.clearRect(0, 0, videoWidth, videoHeight)
    var image = new Image()

    image.onload = function() {
      if (image.src !== '') drawingContext.drawImage(image, 0, 0)
    }
    previousCommands.pop()
    image.src = previousCommands.pop() || ''
  }

  function drawingCanvasMouseDown (event) {
    lineDraw(event.pageX, event.pageY, globalComposite, mouseDown)
    mouseDown = true
  }
  function drawingCanvasMouseMove (event) {
    lineDraw(event.pageX, event.pageY, globalComposite, mouseDown)
  }
  function drawingCanvasMouseRelease () {
    mouseDown = false
    drawingContext.closePath()
  }

  function drawingCanvasMouseUp () {
    if (mouseDown) {
      previousCommands.push(drawingCanvas.toDataURL())
    }
    drawingCanvasMouseRelease()
  }
  var keyMap = []
  function keyShortcuts (event) {
    keyMap[event.keyCode] = event.type == 'keydown'

    if (keyMap[17]) {
      if (keyMap[68]) drawButtonEvent()
    }
  }

  var buttons = document.querySelectorAll('button')

  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i]
    if (button.id !== 'textButton') {
      button.addEventListener('click', function() {
        document.getElementById('drawingCanvas').style.pointerEvents = 'all'
        document.getElementById('textButton').disabled = false 
      })      
    }
  }

  drawingCanvas.addEventListener('mousedown', drawingCanvasMouseDown)
  drawingCanvas.addEventListener('mousemove', drawingCanvasMouseMove)
  drawingCanvas.addEventListener('mouseup', drawingCanvasMouseUp)
  drawingCanvas.addEventListener('mouseleave', drawingCanvasMouseRelease)
  drawButton.addEventListener('click', drawButtonEvent)
  eraseButton.addEventListener('click', eraseButtonEvent)
  undoButton.addEventListener('click', undoButtonEvent)
  drawButtonEvent()
})()