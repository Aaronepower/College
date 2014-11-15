(function () {
	var userMediaCanvas = document.getElementById('userMediaCanvas')
		, filterCanvas    = document.getElementById('filterCanvas')
		, textCanvas      = document.getElementById('textCanvas')
		, drawingCanvas   = document.getElementById('drawingCanvas')
		, hiddenCanvas    = document.getElementById('hiddenCanvas')
		, saveButton      = document.getElementById('saveButton')

	var allCanvas = [userMediaCanvas, filterCanvas, textCanvas, drawingCanvas]
	hiddenCanvas.width = videoWidth
	hiddenCanvas.height = videoHeight

	saveButtonClick = function () {
		var hiddenContext = hiddenCanvas.getContext('2d')
		for (var i = 0; i < allCanvas.length; i++) {
			var currentCanvas = allCanvas[i]
			hiddenContext.drawImage(currentCanvas, 0 ,0)
		}
		window.location.href = hiddenCanvas.toDataURL('image/png')
	}
	saveButton.addEventListener('click', saveButtonClick)
})() 