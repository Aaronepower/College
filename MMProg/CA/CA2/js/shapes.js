(function () {
	var shapesCanvas   = document.getElementById('shapesCanvas')
	  , shapesContext  = shapesCanvas.getContext('2d')
	  , RECT_NAME      = 'rect'
	  , STAR_NAME      = 'star'
	  , ARROW_NAME     = 'arrow'


	var x   = null
		, y   = null
		, x2  = null
		, y2  = null

  drawRect = function(x, y, x2, y2) {
  	shapesContext.rect(x, y, x2, y2)
  	shapesContext.fillStyle = getColor()
  	shapesContext.fill()
  }

  drawStar = function(x, y, x2, y2) {
  	// function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    var rot         = (Math.PI / 2 )* 3
			, newX        = x
			, newY        = y
			, numOfSpikes = 5
			, outRadius = x2 / 2
			, innerRadius = outerRadius / 2
			, step        = Math.PI / numOfSpikes

    shapesContext.beginPath()
    shapesContext.moveTo(x, y - outerRadius)
    for (i = 0 i < spikes i++) {
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
  	if (x === null) {
  		x = event.pageX - rect.left
  		y = event.pageY - rect.top
  	}
  	else if (x2 === null) {
	  	x2 = event.pageX - rect.left
	  	y2 = event.pageY - rect.top

	  	var topX = Math.max(x, x2)
	  	  , topY = Math.max(y, y2)
	  	  , botX = Math.min(x, x2)
	  	  , botY = Math.min(y, y2)

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
  			drawShape(x, y, x2, y2)
  		}
  		break;
  		case ARROW_NAME: {
  			drawArrow(x, y, x2, y2)
  		}
  		break;
  	}
  }
})() 