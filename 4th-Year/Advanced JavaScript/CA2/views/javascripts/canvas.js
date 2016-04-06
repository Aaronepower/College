var dyImage = new DyImage()
  , isMousedown = false

$('canvas')
// Dynamically set the width, and height of all canvas'. Has to be done using
// JavaScript as opposed to CSS, as CSS just magnifies, and stretches the canvas.
.each(function (i, canvas) {
    var $canvas = $(canvas)
    $('.canvas-container').height($canvas.parent().width())

    canvas.width = $canvas.parent().width()
    canvas.height = $canvas.parent().width()
})
.filter('#image-canvas')
// Enables a click-and-drag style on the canvas for moving the image
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

// Once an image has been accepted, we create an image object, and once the 
// image has loaded run onImageLoad function
$('#file').change(function (event) {
    var file = event.target.files[0]
    var image = new Image()
    image.onload = onImageLoad
    image.src = URL.createObjectURL(file)
})

function onImageLoad () {
    var canvas       = $('#image-canvas')[0]
      , $canvas      = $('canvas')
      , canvasWidth  = $canvas.width()
      , canvasHeight = $canvas.height()

    dyImage = new DyImage()

    dyImage.image = this
    dyImage.canvas = canvas
    dyImage.changeSize(this.width, this.height, canvasWidth)
    dyImage.y = Math.floor((canvasHeight / 2) - (dyImage.height / 2))
    dyImage.x = Math.floor((canvasWidth  / 2) - (dyImage.width  / 2))
    dyImage.draw()

    $('#opacity-label').text('Opacity: 100%')

    // all image settings initialisation 
    $('.setting').each(function (_, element) {
        element.disabled = false
    })
    // Manipulating the image's size
    // event functions this value are change to the image, to access the image's
    // width
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
        changePercentage('#size-label', 'size: ', (this.width / dWidth))

    }.bind(this)).on('input', function (event) {
        var target = event.target.value
          , oldWidth = dyImage.width
          , oldHeight = dyImage.height

        dyImage.changeSize(this.width, this.height, target)
        dyImage.x -= diff(dyImage.width, oldWidth)   / 2
        dyImage.y -= diff(dyImage.height, oldHeight) / 2
        dyImage.draw()

        changePercentage('#size-label', 'size: ', (target / this.width))
    }.bind(this))
    // Manipulating the image's opacity
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
    })
    // Manipulating the image's filter's opacity
    .end().filter('#filter-opacity').each(function (_, filter) {
        var alpha = filter.value
        $('#filter-canvas')[0].getContext('2d').globalAlpha = alpha
        changePercentage('#filter-opacity-label', 'Colour Opacity: ', alpha)

    }).on('input', function (event) {
        var $canvas = $('#filter-canvas')
          , context = $canvas[0].getContext('2d')
          , alpha = event.target.value
        context.globalAlpha = alpha
        context.clearRect(0, 0, canvasWidth, canvasHeight)
        context.fillRect(0, 0, canvasWidth, canvasHeight)
        changePercentage('#filter-opacity-label', 'Colour Opacity: ', alpha)
    })
    // Draws the two canvas' onto a secret canvas, and takes the hidden canvas
    // as a single image, and uploads it to the server. 
    .end().filter('#upload').click(function() {
        var canvases = $('.canvas')
          , hiddenCanvas = $('#hidden-canvas')[0]
          , hiddenContext = hiddenCanvas.getContext('2d')
        for (var i = 0; i < canvases.length; i++) {
            hiddenContext.drawImage(canvases[i], 0, 0)
        }
        var image = hiddenCanvas.toDataURL()
        var user = localStorage.getItem('user')
        var tags = $('#tags').val().replace(/ /g, '').split(',').filter(Boolean)

        $.ajax({
            url: '/users/'+user,
            method: 'POST',
            data: {image: image, tags: tags},
            success: function () {
                window.location = '/'
            }
        })
    })
}

// Returns the correct coordinate difference for moving an image with a mouse,
// and resizing the image from it's centre.
function diff (a, b) {
    if (a > b) {
        return Math.floor(a - b)
    } else {
        return Math.floor(-(b - a))
    }
}
// Change the percentage text of an element
function changePercentage (element, text, value) {
    var percentage = Math.floor(value * 100)
    $(element).text(text + percentage + '%')
}