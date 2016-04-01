(function () {
	
	var textCanvas = document.getElementById('textCanvas')
	  , textButton = document.getElementById('textButton')

	var textContext = textCanvas.getContext('2d')
		, charArray   = []
		, mouseX      = 0
		, mouseY      = 0

	textButtonClick = function () {
		textButton.disabled = true
    document.getElementById('drawingCanvas').style.pointerEvents = 'none'
		document.getElementById('shapesCanvas').style.pointerEvents = 'none'
		document.getElementById('rangeTitle').innerHTML = 'Font Size:'
	}

  function textCanvasMouseDown (event) {
		var rect  = getRectMargins()
		mouseX    = event.pageX - rect.left
		mouseY    = event.pageY - rect.top
		charArray = []
  }

  function textCanvasKeypress (event) {
    var character = String.fromCharCode(event.which)
      , width     = mouseX

    textContext.font = getWidthRangeValue()+'px Arial'
    textContext.fillStyle = getColor()
    if (charArray.length > 0) {
     charArray.forEach(function (singleChar) {
       width += textContext.measureText(singleChar).width
     }) 
    }
    textContext.fillText(character, width+10, mouseY)
    charArray.push(character)
  }

  textButton.addEventListener('click', textButtonClick)
  textCanvas.addEventListener('mousedown', textCanvasMouseDown)
  textCanvas.addEventListener('keypress', textCanvasKeypress)
})()