(function () {
	
	var textCanvas = document.getElementById('textCanvas')
	  , textButton = document.getElementById('textButton')

	var textContext = textCanvas.getContext('2d')
		, charArray   = []
		, mouseX      = 0
		, mouseY      = 0

	function textButtonClick () {
		textButton.disabled = true
		document.getElementById('drawingCanvas').style.pointerEvents = 'none'
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

    textContext.font = "70px Arial"
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