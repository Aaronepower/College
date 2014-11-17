(function () {
	var shapesCanvas   = document.getElementById('shapesCanvas')
    , rectButton     = document.getElementById('rectButton')
    , starButton     = document.getElementById('starButton')
    , arrowButton    = document.getElementById('arrowButton')
	  , shapesContext  = shapesCanvas.getContext('2d')
	  , RECT_NAME      = 'rect'
	  , STAR_NAME      = 'star'
	  , ARROW_NAME     = 'arrow'
    , shape          = null


	var x   = null
		, y   = null
		, x2  = null
		, y2  = null

  drawRect = function(x, y, x2, y2) {
    console.log('fired');
  	shapesContext.rect(x, y, x2 - x, y2 - x)
  	shapesContext.fillStyle = getColor()
  	shapesContext.fill()
  }

  drawStar = function(x, y, x2, y2) {
    var rot         = (Math.PI / 2 )* 3
			, newX        = x
			, newY        = y
			, numOfSpikes = 5
			, outRadius = x2 / 2
			, innerRadius = outerRadius / 2
			, step        = Math.PI / numOfSpikes

    shapesContext.beginPath()
    shapesContext.moveTo(x, y - outerRadius)
    for (var i = 0; i < numOfSpikes; i++) {
        x = cx + Math.cos(rot) * outerRadius
        y = cy + Math.sin(rot) * outerRadius
        shapesContext.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius
        y = cy + Math.sin(rot) * innerRadius
        shapesContext.lineTo(x, y)
        rot += step
    }
    shapesContext.lineTo(cx, cy - outerRadius)
    shapesContext.closePath()
    shapesContext.fillStyle = getColor()
    shapesContext.fill()
  }

  function shapesMousedown (event) {
  	var rect = getRectMargins()
    console.log(shape);
  	if (x === null) {
  		x = event.pageX - rect.left
  		y = event.pageY - rect.top
  	}
  	else if (x2 === null) {
	  	x2 = event.pageX - rect.left
	  	y2 = event.pageY - rect.top

	  	var botX = Math.max(x, x2)
	  	  , botY = Math.max(y, y2)
	  	  , topX = Math.min(x, x2)
	  	  , topY = Math.min(y, y2)

        console.log(x, y, x2, y2)

	  	drawShape(topX, topY, botX, botY)
  	}
  }

  function drawShape (x, y ,x2, y2) {
  	switch (shape) {
  		case RECT_NAME: {
  			drawRect(x, y, x2, y2)
  		}
  		break;
  		case STAR_NAME: {
  			drawStar(x, y, x2, y2)
  		}
  		break;
  		case ARROW_NAME: {
  			drawArrow(x, y, x2, y2)
  		}
  		break;
  	}
    clearXAndY()
  }

  function clearXAndY () {
    x  = null
    y  = null
    x2 = null
    y2 = null
  }

  function rectMousedown () {
    disableDrawCanvas()
    shape = RECT_NAME
  }

  function starMousedown () {
    disableDrawCanvas()
    shape = STAR_NAME
  }

  function arrowMousedown () {
    disableDrawCanvas()
    shape = ARROW_NAME
  }
  function disableDrawCanvas () {
    document.getElementById('drawingCanvas').style.pointerEvents = 'none'
  }

  rectButton.addEventListener('click', rectMousedown)
  starButton.addEventListener('click', starMousedown)
  arrowButton.addEventListener('click', arrowMousedown)
  shapesCanvas.addEventListener('mousedown', shapesMousedown)
})()