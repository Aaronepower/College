(function () {
  var drawingCanvas   = document.getElementById('drawingCanvas')
    , drawButton      = document.getElementById('drawButton')
    , eraseButton     = document.getElementById('eraseButton')
    , undoButton      = document.getElementById('undoButton')

  var drawingContext   = drawingCanvas.getContext('2d')
    , previousX        = 0
    , previousY        = 0
    , mouseDown        = false
    , globalComposite  = 'source-over'
    , previousCommands = []
  

  snapButton.disabled = true

  drawButton.disabled  = 
  eraseButton.disabled = false

  function lineDraw (x, y, globalComposite, draw) {
    var rect = getRectMargins()
  console.log(rect.left, rect.top)
    x -= rect.left
    y -= rect.top
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
    if (mouseDown) {
      previousCommands.push(drawingCanvas.toDataURL())
    }
    mouseDown = false
    drawingContext.closePath()
  }

  drawingCanvas.addEventListener('mousedown', drawingCanvasMouseDown)
  drawingCanvas.addEventListener('mousemove', drawingCanvasMouseMove)
  drawingCanvas.addEventListener('mouseup', drawingCanvasMouseRelease)
  drawingCanvas.addEventListener('mouseleave', drawingCanvasMouseRelease)
  drawButton.addEventListener('click', drawButtonClick)
  eraseButton.addEventListener('click', eraseButtonClick)
  undoButton.addEventListener('click', undoButtonClick)
  drawButtonClick()
})()