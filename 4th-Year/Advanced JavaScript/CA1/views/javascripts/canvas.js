var dyImage = new DyImage()
  , isMousedown = false

$('canvas')
.each(function (i, canvas) {
    var $canvas = $(canvas)
    $('.canvas-container').height($canvas.parent().width())

    canvas.width = $canvas.parent().width()
    canvas.height = $canvas.parent().width()
})
.filter('#image-canvas')
.mousedown(function() {isMousedown = true})
.mouseup(function() {isMousedown = false})
.mousemove(function (event) {
    if (dyImage.image && isMousedown) {

        dyImage.x += diff(event.clientX, dyImage.prevX)
        dyImage.y += diff(event.clientY, dyImage.prevY)
        dyImage.draw()
    }

    dyImage.prevX = event.clientX
    dyImage.prevY = event.clientY
})

$('#file').change(function (event) {
    var file = event.target.files[0]
    var image = new Image()
    image.onload = onImageLoad
    image.src = URL.createObjectURL(file)
})

function onImageLoad () {
    var canvas = $('#image-canvas')[0]
      , $canvas = $('canvas')
      , canvasWidth = $canvas.width()
      , canvasHeight = $canvas.height()

    dyImage = new DyImage()
    dyImage.image = this
    dyImage.canvas = canvas
    dyImage.changeSize(this.width, this.height, canvasWidth)
    dyImage.y = Math.floor((canvasHeight / 2) - (dyImage.height / 2))
    dyImage.x = Math.floor((canvasWidth /2 ) - (dyImage.width / 2))
    dyImage.draw()

    $('#opacity-label').text('Opacity: 100%')

    // all image settings initialisation 
    $('.setting').each(function (_, element) {
        element.disabled = false
    })
    // Manipulating the image's size
    .filter('#size').each(function (_, size) {
        var width  = this.width
          , dWidth = dyImage.width
        size.min = width * 0.1
        if (dWidth > width) {
            size.max = dWidth
        } else {
            size.max = this.height
        }
        size.value = dWidth
        changeSizePercentage(width, dWidth)
    }.bind(this)).on('input', function (event) {
        var target = event.target.value
          , oldWidth = dyImage.width
          , oldHeight = dyImage.height

        dyImage.changeSize(this.width, this.height, target)
        dyImage.x -= diff(dyImage.width, oldWidth)   / 2
        dyImage.y -= diff(dyImage.height, oldHeight) / 2
        dyImage.draw()

        changeSizePercentage(this.width, target)
    }.bind(this))
    // Manipulating the image's
    .end().filter('#opacity').on('input', function (event) {
        var newOpacity = event.target.value
        $('#opacity-label').text('Opacity: ' + Math.floor(newOpacity * 100) + '%')
        dyImage.canvas.getContext('2d').globalAlpha = newOpacity
        dyImage.draw()
    })
    // Manipulating the image's filter
    .end().filter('#filter').change(function (event) {
        var $canvas = $('#filter-canvas')
          , context = $canvas[0].getContext('2d')

        context.fillStyle = event.target.value
        context.fillRect(0, 0, canvasWidth, canvasHeight)
    })
    // Manipulating the filter clear button
    .end().filter('#clear').click(function() {
        var context = $('#filter-canvas')[0].getContext('2d')
        context.clearRect(0, 0, canvasWidth, canvasHeight)
        $('')
    })
    // Manipulating the image's filter's opacity
    .end().filter('#filter-opacity').each(function (_, filter) { 
        $('#filter-canvas')[0].getContext('2d').globalAlpha = filter.value
        $('#filter-opacity-label').text(' ' + Math.floor(filter.value * 100)+'%')

    }).on('input', function (event) {
        var $canvas = $('#filter-canvas')
          , context = $canvas[0].getContext('2d')
        context.globalAlpha = event.target.value
        context.clearRect(0, 0, canvasWidth, canvasHeight)
        context.fillRect(0, 0, canvasWidth, canvasHeight)
        $('#filter-opacity-label').text('Filter Opacity: '+ Math.floor(event.target.value * 100)+'%')
    })
}

function diff (a, b) {
    if (a > b) {
        return Math.floor(a - b)
    } else {
        return Math.floor(-(b - a))
    }
}

function changeSizePercentage (imageWidth, dyImageWidth) {
    var percentage = Math.floor((dyImageWidth / imageWidth) * 100)
    $('#size-label').text('size: ' + percentage + '%')
}