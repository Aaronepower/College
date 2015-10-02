function Baton () {
  this.x = 0;
  this.y = 0;
  this.color = "#ffff00";
  this.rotation = 0;
}

Baton.prototype.draw = function (context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.lineWidth = 2;
	context.fillStyle = this.color;
	context.beginPath();
	context.moveTo(-10, -10);
	context.lineTo(-10, 0);
	context.lineTo(20, 0);
	context.lineTo(20, -10);
	context.lineTo(-10, -10);
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
};
