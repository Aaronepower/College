(function () {
	'use strict';

  navigator.getUserMedia = ( navigator.getUserMedia 
                          || navigator.webkitGetUserMedia 
                          || navigator.mozGetUserMedia
                           )

  var userMediaVideo   = document.getElementById('userMediaVideo')
	  , snapButton       = document.getElementById('snapButton')
	  , seriesButton     = document.getElementById('seriesButton')
		, userMediaCanvas  = document.getElementById('userMediaCanvas')
		, userMediaContext = userMediaCanvas.getContext('2d')

  var videoSettings = { video: { mandatory: { maxWidth : videoWidth
                                            , maxHeight : videoHeight
                                            , minWidth : videoWidth
                                            , minHeight : videoHeight
                                            }
                               }
                      }
	
	function singleSnapShot () {
	  userMediaContext.clearRect(0,0, videoWidth, videoHeight)
	  userMediaContext.drawImage(userMediaVideo, 0, 0)
	}
  
  function errorCallback (e) { console.log('Error: ', e) }

  function successCallback (stream) {
    if (window.URL) {
      userMediaVideo.src = window.URL.createObjectURL(stream)
    }
    else {
      userMediaVideo.src = stream
    }
    snapButton.disabled = false
    userMediaVideo.play()
  }

  function seriesSnapShot () {
  	userMediaContext.clearRect(0,0, videoWidth, videoHeight)

  	var divider     = 3
      , numOfDigits = 6
      , newWidth    = (videoWidth / divider)
      , newHeight   = (videoHeight / divider)
      , x           = 0
      , y           = 0

  	function takeSnaps () {
	  	userMediaContext.drawImage(userMediaVideo, x, y, newWidth, newHeight)
      var canvasXBounds = (videoWidth).toFixed(numOfDigits)
        , canvasYBounds = (videoHeight).toFixed(numOfDigits)

	  	if (x === 0 || !x.toFixed(numOfDigits).equals(canvasXBounds)) {
	  		x += newWidth
	  	}
	  	else if (y === 0 || !y.toFixed(numOfDigits).equals(canvasYBounds)) {
	  		y += newHeight
	  		x = 0
	  	}
	  	else {
	  		clearInterval(interval)
	  	}
	  }
  	var interval = window.setInterval(takeSnaps,1000)
  }
	
  navigator.getUserMedia(videoSettings, successCallback, errorCallback)
  snapButton.addEventListener('click', singleSnapShot)
  seriesButton.addEventListener('click', seriesSnapShot)
})()