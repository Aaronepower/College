/**
 * Normalize the browser animation API across implementations. This requests
 * the browser to schedule a repaint of the window for the next animation frame.
 * Checks for cross-browser support, and, failing to find it, falls back to setTimeout.
 * @param {function}    callback  Function to call when it's time to update your animation for the next repaint.
 * @param {HTMLElement} element   Optional parameter specifying the element that visually bounds the entire animation.
 * @return {number} Animation frame request.
 */
 
 if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 17 /*~ 1000/60*/);
    });
}

/**
 * Cancels an animation frame request.
 * Checks for cross-browser support, falls back to clearTimeout.
 * @param {number}  Animation frame request.
 */
 if (!window.cancelRequestAnimationFrame) {
  window.cancelRequestAnimationFrame = (window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.clearTimeout);
}


/* Object that contains our utility functions.
 * Attached to the window object which acts as the global namespace.
 */
 window.utils = {};

 var GRAVITY = -9.8
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
 function S (plane, value, t) {
  switch (plane) {
    case "x":
    return value*t
    break;

    case "y":
    return value*t + ((GRAVITY/2)*Math.pow(t, 2))
    break;
  }
}

function V (plane, value, t) {
  switch (plane) {
    case "x":
    return value
    break;
    case "y":
    return value + (GRAVITY*t)
  }
}