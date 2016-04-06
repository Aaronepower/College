function DyImageService() {
    let image = null
      , canvas = null
      , x = 0
      , y = 0
      , mouseX = 0
      , mouseY = 0
      , width = 0
      , height = 0

    function exists() {
        return canvas !== null && image !== null
    }

    function getWidth() {
        return width
    }

    function init(newImage, newCanvas) {
        image = newImage
        canvas = newCanvas
        width = image.width
        height = image.height
        changeSize(canvas.width)
        x = Math.floor((canvas.width / 2) - (width / 2))
        y = Math.floor((canvas.height / 2) - (height / 2))
        draw()
    }
    function changeAlpha(value) {
        canvas.getContext('2d').globalAlpha = value
    }
    
    function changeSize(target) {
        if (target > width && target > height) {
            return;
        }

        const aspectRatio = image.height / image.width
        , scaledHeight = Math.ceil(aspectRatio * target)
        if (target > scaledHeight) {
            const portraitAspectRatio = image.width / image.height
            , scaledWidth = Math.ceil(portraitAspectRatio * target) 
            width = scaledWidth
            height = target
        } else {
            width = target
            height = scaledHeight
        }
    }

    function setMousePosition(x, y) {
        mouseX = x
        mouseY = y
    }

    function reposition() {
        x = Math.floor((canvas.width / 2) - (width / 2))
        y = Math.floor((canvas.height / 2) - (height / 2))
    }

    function translate(x2, y2) {
        x += diff(x2, mouseX)
        y += diff(y2, mouseY)
    }
    
    // Returns the correct coordinate difference for moving an image with the mouse, and resizing the image from it's centre.
    function diff(a, b) {
        if (a > b) {
            return Math.floor(a - b)
        } else {
            return Math.floor(-(b - a))
        }
    }

    function draw() {
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(image, x, y, width, height)
    }

    return {
        changeAlpha: changeAlpha,
        exists: exists,
        init: init,
        changeSize: changeSize,
        translate: translate,
        diff: diff,
        draw: draw,
        width: getWidth,
        reposition: reposition,
        setMousePosition: setMousePosition,
    }
}

angular.module('CA2')
       .factory('DyImageService', DyImageService)