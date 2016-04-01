navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {audio: false, video: true};
var video = document.querySelector("video");

function successCallback(stream) {
  window.stream = stream; // stream available to console
  if (window.URL) {
    video.src = window.URL.createObjectURL(stream);
  } else {
    video.src = stream;
  }
  video.play();
}

function errorCallback(error){
  console.log("navigator.getUserMedia error: ", error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);
/*
GetUserMedia() is a HTML5 standard to enable video audio capture from browser. 
without a plugin
check for browser support for getUserMedia by
navigator.getUserMedia()
as this is a web proposal the vendors have implemented it using prefixes. 
function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}
to get access to the microphone or video we call the 
  navigator.getUserMedia({video: true, audio: false}, function(stream), errorCallback)
  method with 3 arguments:
 1. The object inside specifies which access is requested.
 This request needs to be acknowleged or denied inside the browser.
 2. the function has the mediaStream as a parameter. It will add this to an existing video element as a Blob URL.that will run iside the HTML5 video element. 
	function(stream) {
			video.src = window.URL.createObjectURL(stream);
    }
3. an errorCallback function that handles errors in the code. This is useful for browsers that cannot handle getUserMedia and an alternative videofile can be loaded instead.
	function errorCallback(e) {
	  video.src = 'fallbackvideo.webm';
	}

capture can be added to buttons as follows:
	
button.addEventListener('click', function(e) {
  if (navigator.getUserMedia) {
    navigator.getUserMedia('video', function(stream) {
      video.src = stream;
      video.controls = true;
      localMediaStream = stream;
    }, errorCallback);
  } else if (navigator.webkitGetUserMedia) {
    navigator.webkitGetUserMedia({video: true}, function(stream) {
      video.src = window.URL.createObjectURL(stream);
      video.controls = true;
      localMediaStream = stream;
    }, errorCallback);
  } else {
    errorCallback({target: video});
  }
}, false);

document.querySelector('#stop-button').addEventListener('click', function(e) {
  video.pause();
  localMediaStream.stop(); // Doesn't do anything in Chrome.
}, false);
})();	

*/
	