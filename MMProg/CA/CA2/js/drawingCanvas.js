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
  
  video.width            = 
  canvasWrapper.width    = 
  userMediaCanvas.width  = 
  filterCanvas.width     = 
  textCanvas.width       = 
  drawingCanvas.width    = videoWidth

  video.height           = 
  canvasWrapper.height   = 
  userMediaCanvas.height = 
  filterCanvas.height    = 
  textCanvas.height      = 
  drawingCanvas.height   = videoHeight

  snapButton.disabled = true

  drawButton.disabled  = 
  eraseButton.disabled = false

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

  drawButtonClick = function () {
    globalComposite = 'source-over'
  }

  eraseButtonClick = function () {
    globalComposite = 'destination-out'
  }

  undoButtonClick = function () {
    drawingContext.clearRect(0, 0, videoWidth, videoHeight)
    var image = new Image()

    image.onload = function() {
      if (image.src !== '') drawingContext.drawImage(image, 0, 0)
    }
    if (firstFired) {
      previousCommands.pop()
      firstFired = false
    }
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

  drawingCanvas.addEventListener('mousedown', drawingCanvasMouseDown)
  drawingCanvas.addEventListener('mousemove', drawingCanvasMouseMove)
  drawingCanvas.addEventListener('mouseup', drawingCanvasMouseUp)
  drawingCanvas.addEventListener('mouseleave', drawingCanvasMouseRelease)
  drawButton.addEventListener('click', drawButtonClick)
  eraseButton.addEventListener('click', eraseButtonClick)
  undoButton.addEventListener('click', undoButtonClick)
  drawButtonClick()
})()