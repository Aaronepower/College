var videoWidth  = 640
  , videoHeight = 480
  , singleSnapShot
  , drawButtonClick
  , eraseButtonClick
  , undoButtonClick
  , textButtonClick
  , saveButtonClick
  , firstFired = true
function getRectMargins () {
	var rect = drawingCanvas.getBoundingClientRect()

	return { left : rect.left
		     , top : rect.top
	       }
}

function getColor () {
  return document.getElementById('colorPicker').value
}

function getWidthRangeValue () {
  return document.getElementById('lineWidth').value
}