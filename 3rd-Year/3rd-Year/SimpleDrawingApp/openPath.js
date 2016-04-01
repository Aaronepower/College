function openPath(ctx,strC,strW) {
  this.strokeCol = strC|| '#AAAAAA';
  this.strokeWidth = strW;
  this.context = ctx;
  this.points = new Array();
  this.init();

}



openPath.prototype = {
  // initialization, sets this.context to point
  // to the context if the canvas object
  init: function () {
    if (this.context === undefined) {
      var canvas = document.getElementById('canvas');
      Shape.prototype.context = canvas.getContext('2d');
  	  }
  },

  setPoints: function(mPos) {
  	this.points.push(mPos);
  },

  // method that draws a shape by looping through this.points
  draw: function () {
    var i, ctx = this.context;
    ctx.strokeStyle = this.strokeCol;
    ctx.lineWidth = this.strokeWidth;
    ctx.beginPath();

    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }

    //ctx.closePath();
    ctx.stroke();
  },

  // method that generates a random color
  getColor: function () {
    var i, rgb = [];
    for (i = 0; i < 3; i++) {
      rgb[i] = Math.round(255 * Math.random());
    }
    return 'rgb(' + rgb.join(',') + ')';
  },

}










