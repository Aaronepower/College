'use strict';
var videoWidth  = 640
  , videoHeight = 480
  , singleSnapShot
  , drawButtonClick
  , eraseButtonClick
  , undoButtonClick
  , textButtonClick
  , saveButtonClick
  , drawRect
  , drawStar
  , drawArrow
  , firstFired = true
function getRectMargins () {
	var canvas = document.querySelector('#drawingCanvas')
	  , top    = 0
	  , left   = 0

	// Used over elem.getBoundingClient() as it is broken on chrome
	while(canvas) {
	  top  = top + canvas.offsetTop
	  left = left +canvas.offsetLeft
	  canvas = canvas.offsetParent       
	}

	return { left : left
		     , top : top
	       }
}

function getColor () {
  return document.getElementById('colorPicker').value
}

function getWidthRangeValue () {
  return document.getElementById('lineWidth').value
}