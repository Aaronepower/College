function getRectMargins () {
	var rect = drawingCanvas.getBoundingClientRect()

	return { left : rect.left
		, top : rect.top
	}
}