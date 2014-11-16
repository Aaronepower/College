(function () {

	function keyShortcuts (event) {
		if (event.ctrlKey && event.altKey) {
			switch (event.which){
				case 68: {

					drawButtonClick()
				}
				break;
				case 69: {
					eraseButtonClick()
				}
				break;
				case 83: {

					saveButtonClick()
				}
				break;
				case 84: {

					textButtonClick()
				}
				break;
				case 85: {

					undoButtonClick()
				}
				break;
			}
		}
		event.preventDefault()
	}

	document.addEventListener('keyup', keyShortcuts)
})()