"use strict";

var DrawingError = require('./DrawingError'),
  Tool = require('./Tool');

Point.prototype = new Tool();
Point.prototype.constructor = Point;

function Point (args) {
  var point = this;

  point.args = args;
  point.anchors = 1;
  point.coords = [];

  point.init();
}

Point.prototype.draw = function (canvas) {
  var x = this.coords[0][0],
    y = this.coords[0][1];
  //console.log('x: ', x, 'y: ', y);
  if (x > 0 && y > 0 && y < canvas.pixels.length + 1 && x < canvas.pixels[y - 1].length + 1) {
    canvas.pixels[y - 1][x - 1] = 'x';
  }
};

module.exports = Point;
