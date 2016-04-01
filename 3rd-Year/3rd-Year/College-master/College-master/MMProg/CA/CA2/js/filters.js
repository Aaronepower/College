(function () {
	
	function downloadCallback () {

		var negativeButton = document.getElementById('negativeButton')
		  , polaroidButton = document.getElementById('polaroidButton')

		function imageOverlay (path) {
			return function() {
				var filterCanvas  = document.getElementById('filterCanvas')
				  , filterContext = filterCanvas.getContext('2d')

				filterContext.clearRect(0,0, videoWidth, videoHeight)
				filterContext.drawImage(imageLoader.getAsset(path), 0,0)
			}
		}

		var negativeEvent = imageOverlay(imagePaths.negative)
		  , polaroidEvent = imageOverlay(imagePaths.polaroid)

		negativeButton.addEventListener('click', negativeEvent, false)
		polaroidButton.addEventListener('click', polaroidEvent, false)
	}

	var imageLoader = new AssetManager()
	  , imagePaths  = { negative: './img/negative.png'
	                  , polaroid: './img/polaroid.png'
                    }

	imageLoader.queueDownload(imagePaths.negative)
	imageLoader.queueDownload(imagePaths.polaroid)
	imageLoader.downloadAll(downloadCallback)
})()