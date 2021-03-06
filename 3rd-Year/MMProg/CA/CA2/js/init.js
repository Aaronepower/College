(function () {
	'use strict';
	var buttons       = document.querySelectorAll('button')
		, AllCanvas     = document.querySelectorAll('canvas')
		, canvasWrapper = document.getElementById('canvasWrapper')

	function enableDrawingCanvasEvent () {
		document.getElementById('drawingCanvas').style.pointerEvents = 'all'
		document.getElementById('textButton').disabled = false
		document.getElementById('rangeTitle').innerHTML = 'Line Width:'
	}

	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i]
		if (button.id !== 'textButton') {
			button.addEventListener('click', enableDrawingCanvasEvent)
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