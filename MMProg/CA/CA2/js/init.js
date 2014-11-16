(function () {
	var buttons = document.querySelectorAll('button')

	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i]
		if (button.id !== 'textButton') {
			button.addEventListener('click', function() {
				document.getElementById('drawingCanvas').style.pointerEvents = 'all'
				document.getElementById('textButton').disabled = false
				document.getElementById('rangeTitle').innerHTML = 'Line Width:'
			})
		}
	}
})() 