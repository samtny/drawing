"use strict";

var DrawingError = require('./DrawingError'),
  Line = require('./Line'),
  Tool = require('./Tool');

Rectangle.prototype = new Tool();
Rectangle.prototype.constructor = Rectangle;

function Rectangle (args) {
  var rectangle = this;

  rectangle.args = args;
  rectangle.anchors = 2;
  rectangle.coords = [];

  rectangle.init();
}

Rectangle.prototype.draw = function (canvas) {
  var line = new Line([ this.args[0], this.args[1], this.args[2], this.args[1], this.color ]);
  line.draw(canvas);
  line = new Line([ this.args[0], this.args[1], this.args[0], this.args[3], this.color ]);
  line.draw(canvas);
  line = new Line([ this.args[2], this.args[3], this.args[2], this.args[1], this.color ]);
  line.draw(canvas);
  line = new Line([ this.args[2], this.args[3], this.args[0], this.args[3], this.color ]);
  line.draw(canvas);
};

module.exports = Rectangle;
