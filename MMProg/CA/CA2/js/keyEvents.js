(function () {
	var keyCodes = { D : 68
	               , E : 69
	               , S : 83
	               , T : 84
	               , U : 85
	               }

	function keyShortcuts (event) {
		if (event.ctrlKey && event.altKey) {
			switch (event.which){
				case keyCodes.D: {

					drawButtonClick()
				}
				break;
				case keyCodes.E: {
					eraseButtonClick()
				}
				break;
				case keyCodes.S: {

					saveButtonClick()
				}
				break;
				case keyCodes.T: {

					textButtonClick()
				}
				break;
				case keyCodes.U: {

					undoButtonClick()
				}
				break;
			}
		}
		event.preventDefault()
	}

	document.addEventListener('keyup', keyShortcuts)
})()