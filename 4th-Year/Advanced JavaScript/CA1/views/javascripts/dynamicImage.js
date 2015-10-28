function DyImage (image) {
	this.image = image
	this.canvas = null
	this.x = 0
	this.y = 0
	this.prevX = 0
	this.prevY = 0
	this.width = 0
	this.height = 0
}

DyImage.prototype.changeSize = function (width, height, target) {
	if (target > width && target > height) {
		this.width = this.image.width
		this.height = this.image.height
		return;
	}

	var aspectRatio = height / width
	  , newHeight   = Math.ceil(aspectRatio * target)

	if (newHeight > target) {
		var newAspectRatio = width / height
		  , newWidth = Math.ceil(newAspectRatio * target)

		this.width = newWidth
		this.height = target
	
	} else {
		this.width = target
		this.height = newHeight
	}
}

DyImage.prototype.setPos = function(x, y) {
	this.x = x
	this.y = y
}

DyImage.prototype.draw = function(x, y, width, height) {
	x = x || this.x
	y = y || this.y
	width = width || this.width
	height = height || this.height

	var $canvas = $(this.canvas)
	  , context = this.canvas.getContext('2d')
    context.clearRect(0, 0, $canvas.width(), $canvas.height())
    console.log(width, height);
    context.drawImage(this.image, x, y, width, height)
};