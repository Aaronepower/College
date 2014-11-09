(function () {
  'use strict';
  navigator.getUserMedia = ( navigator.getUserMedia 
                          || navigator.webkitGetUserMedia 
                          || navigator.mozGetUserMedia
                           )
  var imageLoader = new AssetManager()
    , imagePaths  = { negative: './img/negative.png'
                    , polaroid: './img/polaroid.png'
                    }

  imageLoader.queueDownload(imagePaths.negative)
  imageLoader.queueDownload(imagePaths.polaroid)
  imageLoader.downloadAll(function() {
    var imageOverlay = function(path) {
      return function() {
                var oldImage = canvas.toData
                context.clearRect(0,0, videoWidth, videoHeight)
                context.drawImage(currentSnap, 0,0)
                var image = imageLoader.getAsset(path)
                context.drawImage(image, 0,0)
             }
    }

    var negativeEvent = imageOverlay(imagePaths.negative)
      , polaroidEvent = imageOverlay(imagePaths.polaroid)

    negativeButton.addEventListener('click', negativeEvent, false)
    polaroidButton.addEventListener('click', polaroidEvent, false)
  })

  var video          = document.getElementById('video')
    , canvas         = document.getElementById('canvas')
    , snapShotButton = document.getElementById('snapShotButton')

  var context          = canvas.getContext('2d')
    , localMediaStream = null
    , currentSnap      = new Image() 
    , videoWidth       = 640
    , videoHeight      = 480
    , mouseDown        = false
  
  video.width = videoWidth
  video.height = videoHeight
  canvas.width = videoWidth
  canvas.height = videoHeight
  var snapShot = function () {
        if (localMediaStream) {
          context.clearRect(0,0, videoWidth, videoHeight)
          context.drawImage(video, 0, 0)
          currentSnap.src = canvas.toDataURL()
        }
  }
  
  var errorCallback = function (e) {

      console.log('trouble in paradise', e)
  }

  var successCallback = function (stream) {
        if (window.URL) {
          video.src = window.URL.createObjectURL(stream)
        }
        else {
          video.src = stream
        }
        localMediaStream = stream
        video.play()
  }

  var videoSettings = { video: { mandatory: { maxWidth: videoWidth
                                            , maxHeight: videoHeight
                                            }
                               }
                      }

  var previousX
    , previousY
  var lineDraw = function(x, y, draw) {
        if (draw) {
          context.beginPath()
          context.strokeStyle = 'black'
          context.lineWidth = 5
          context.moveTo(previousX, previousY)
          context.lineTo(x, y)
          context.closePath()
          context.stroke()
        }
        previousX = x
        previousY = y 
  }
  var canvasMouseDown = function(event) {
  var rect = canvas.getBoundingClientRect()
        lineDraw(event.pageX - rect.left, event.pageY - rect.top, mouseDown)
        mouseDown = true
  }
  var canvasMouseMove = function(event) {
  var rect = canvas.getBoundingClientRect()
        console.log(mouseDown)
        lineDraw(event.pageX - rect.left, event.pageY - rect.top, mouseDown)
  }
  var canvasMouseRelease = function(event) {
        mouseDown = false
  }
  snapButton.addEventListener('click', snapShot, false)
  canvas.addEventListener('mousedown', canvasMouseDown, false)
  canvas.addEventListener('mousemove', canvasMouseMove, false)
  canvas.addEventListener('mouseup', canvasMouseRelease, false)
  canvas.addEventListener('mouseleave', canvasMouseRelease, false)
  navigator.getUserMedia(videoSettings, successCallback, errorCallback)

})(); 