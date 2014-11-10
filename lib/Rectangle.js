"use strict";

var DrawingError = require('./DrawingError'),
  Line = require('./Line'),
  Shape = require('./Shape');

Rectangle.prototype = new Shape();
Rectangle.prototype.constructor = Rectangle;

function Rectangle (args) {
  var rectangle = this;

  rectangle.args = args;
  rectangle.anchors = 2;
  rectangle.coords = [];

  rectangle.init();
}

Rectangle.prototype.draw = function (canvas) {
  var line = new Line([ this.args[0], this.args[1], this.args[2], this.args[1] ]);
  line.draw(canvas);
  line = new Line([ this.args[0], this.args[1], this.args[0], this.args[3] ]);
  line.draw(canvas);
  line = new Line([ this.args[2], this.args[3], this.args[2], this.args[1] ]);
  line.draw(canvas);
  line = new Line([ this.args[2], this.args[3], this.args[0], this.args[3] ]);
  line.draw(canvas);
};

module.exports = Rectangle;
