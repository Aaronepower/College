(function () {
	'use strict';
	var allCanvas = document.querySelectorAll('canvas')
	  , saveButton = document.getElementById('saveButton')

	saveButtonClick = function () {
		var hiddenCanvas = allCanvas.item(allCanvas.length)
		var hiddenContext = hiddenCanvas.getContext('2d')
		for (var i = 0; i < allCanvas.length -1; i++) {
			var currentCanvas = allCanvas[i]
			hiddenContext.drawImage(currentCanvas, 0 ,0)
		}
		window.location.href = hiddenCanvas.toDataURL('image/png')
	}

	saveButton.addEventListener('click', saveButtonClick)
})()