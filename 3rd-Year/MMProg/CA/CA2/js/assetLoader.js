/**
 * Created by pietschj on 28/10/2014.
 */

 function AssetManager() {
  this.successCount = 0;
  this.errorCount = 0;
  this.cache = {};
  this.downloadQueue = [];
}

AssetManager.prototype.queueDownload = function(path) {
  this.downloadQueue.push(path);
}

AssetManager.prototype.downloadAll = function(callback) {
  if (this.downloadQueue.length === 0 && this.soundsQueue.length === 0) {
    callback();
  }

  function successFunc () {
    console.log(this.src + ' is loaded');
    that.successCount += 1;
    if (that.isDone()) {
      callback();
    }
  }

  function errorFunc() {
    that.errorCount += 1;
    if (that.isDone()) {
      callback();
    }
  }

  for (var i = 0; i < this.downloadQueue.length; i++) {
    var path = this.downloadQueue[i];
    var img = new Image();
    var that = this;
    img.addEventListener("load", successFunc, false);
    img.addEventListener("error", errorFunc, false);
    img.src = path;
    this.cache[path] = img;
  }
}

AssetManager.prototype.getAsset = function(path) {
  return this.cache[path];
}

AssetManager.prototype.isDone = function() {
  return (this.downloadQueue.length == this.successCount + this.errorCount);
}