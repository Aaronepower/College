function CanvasController($http, DyImageService, UserService) {
    this.file = null
    this.opacity = 1
    this.filterOpacity = 0
    this.size = 0
    this.isMouseDown = false

    let vm = this
    
    // Setting all of the canvas' to their containers width & height. The canvas-container's width
    // is relative, and in order to properly scale canvas' it needs to be changed using JavaScript
    // Preforming the operation in CSS will cause the canvas to be of the same pixel width and 
    // height, but be stretched into the new dimensions.
    for (let canvas of document.querySelectorAll('canvas')) {
        canvas.width = canvas.parentNode.offsetWidth

        canvas.parentNode.style.height = canvas.width + 'px'

        canvas.width = canvas.parentNode.offsetWidth
        canvas.height = canvas.parentNode.offsetWidth
    }

    this.mousemove = function(event) {
        if (DyImageService.exists() && vm.isMouseDown) {
            DyImageService.translate(event.clientX, event.clientY)
            DyImageService.draw()
        }

        DyImageService.setMousePosition(event.clientX, event.clientY)
    }

    this.fileChange = function(event) {
        let file = document.querySelector('#file').files[0]
        vm.image = new Image()
        vm.image.onload = function () {
            DyImageService.init(this, document.querySelector('#image-canvas'))
            let size = document.querySelector('#size')
            size.min = this.width * 0.1

            if (this.width < DyImageService.width()) {
                size.max = DyImageService.width()
            } else {
                size.max = this.height
            }
            size.value = DyImageService.width()
            vm.size = DyImageService.width()
        }
        vm.image.src = window.URL.createObjectURL(file)
    }

    this.sizeChange = function(size) {
        DyImageService.changeSize(size)
        DyImageService.reposition()
        DyImageService.draw()
    }

    this.opacityChange = function(opacity) {
        DyImageService.changeAlpha(opacity)
        DyImageService.draw()
    }

    const filter = document.querySelector('#filter')
    const filterCanvas = document.querySelector('#filter-canvas')
    const filterContext = filterCanvas.getContext('2d')
    const filterOpacity = document.querySelector('#filterOpacity')

    function drawFilter() {
        filterContext.globalAlpha = vm.filterOpacity
        filterContext.clearRect(0, 0, filterCanvas.width, filterCanvas.height)
        filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
    }

    this.clearFilter = function() {
        filterContext.clearRect(0, 0, filterCanvas.width, filterCanvas.height)
    }

    this.filterColourChange = function(colour) {
        filterContext.fillStyle = colour
        drawFilter()
    }

    this.filterOpacityChange = function(opacity) {
        filterCanvas.globalAlpha = opacity
        drawFilter()
    }

    this.upload = function() {
        const hidden = document.querySelector('#hidden-canvas')
            , hiddenContext = hidden.getContext('2d')
        for (let canvas of document.querySelectorAll('.canvas')) {
            if (canvas.id === "hidden-canvas") {
                break;
            }
            hiddenContext.drawImage(canvas, 0, 0)
        }
        let image = hiddenCanvas.toDataURL()
        let user = UserService.getUser()
        // Transforms the text into a much more meaningful array of tags.
        // Example input: "sunny, autumn, mountains,"
        let tags = document.querySelector('#tags').value
                                                  // "sunny,autumn,mountains,"
                                                  .replace(/ /g, '')
                                                  // ["sunny", "autumn", "mountains", ""]
                                                  .split(',')
                                                  // ["sunny", "autumn", "mountains"]
                                                  .filter(Boolean)

        $http.post('/users/'+user, {image: image, tags: tags}).success(function() {
            window.location = '/'
        })
    }
}

angular.module('CA2')
       .controller('CanvasController', CanvasController)
