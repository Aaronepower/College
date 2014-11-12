var videoWidth  = 640
  , videoHeight = 480
;(function () {
	'use strict';

  navigator.getUserMedia = ( navigator.getUserMedia 
                          || navigator.webkitGetUserMedia 
                          || navigator.mozGetUserMedia
                           )

  var userMediaVideo   = document.getElementById('userMediaVideo')
	  , snapButton       = document.getElementById('snapButton')
		, userMediaCanvas  = document.getElementById('userMediaCanvas')
		, userMediaContext = userMediaCanvas.getContext('2d')

  var videoSettings = { video: { mandatory: { maxWidth : videoWidth
                                            , maxHeight : videoHeight
                                            , minWidth : videoWidth
                                            , minHeight : videoHeight
                                            }
                               }
                      }
	
	function snapShot () {
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
	
  navigator.getUserMedia(videoSettings, successCallback, errorCallback)
  snapButton.addEventListener('click', snapShot)
})()