"use strict";

var DrawingError = require('./DrawingError'),
  Line = require('./Line'),
  Tool = require('./Tool');

Circle.prototype = new Tool();
Circle.prototype.constructor = Circle;

function Circle (args) {
  var circle = this;

  circle.args = args;
  circle.anchors = 2;
  circle.coords = [];

  circle.init();
}

Circle.prototype.draw = function (canvas) {
  var a = this.coords[0],
    b = this.coords[1],
    x1 = a[0],
    y1 = a[1],
    x2 = b[0],
    y2 = b[1],
    r = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

  console.log('r: ', r);
};

module.exports = Circle;
