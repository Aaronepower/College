(function () {
	var buttons = document.querySelectorAll('button')
	  , AllCanvas = document.querySelectorAll('canvas')
	  , canvasWrapper = document.getElementById('canvasWrapper')
    


	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i]
		if (button.id !== 'textButton' && button.id !== 'rectButton'&& button.id !== 'starButton' && button.id !== 'arrowButton') {
			button.addEventListener('click', function() {
				document.getElementById('drawingCanvas').style.pointerEvents = 'all'
				document.getElementById('textButton').disabled = false
				document.getElementById('rangeTitle').innerHTML = 'Line Width:'
			})
		}
	}

	for (var i = 0; i < AllCanvas.length; i++) {
		var currentCanvas = AllCanvas[i]
		currentCanvas.width = videoWidth
		currentCanvas.height = videoHeight
	}
	canvasWrapper.width = videoWidth
	canvasWrapper.height = videoHeight
})() 