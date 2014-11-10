"use strict";

var DrawingError = require('./DrawingError'),
  _ = require('underscore');

Shape.prototype = new Plottable();
Shape.prototype.constructor = Shape;

var Shape = function (args) {
  var shape = this;

  shape.args = args;
  shape.anchors = null;
  shape.coords = [];
};

Shape.prototype.init = function () {
  if (this.anchors === null || isNaN(this.anchors)) {
    throw new DrawingError('Shape has undefined property \'anchors\'');
  }

  if (this.args === null || !Array.isArray(this.args) || this.args.length !== this.anchors * 2) {
    throw new DrawingError('Invalid number of arguments specified');
  }

  _.each(this.args, function (arg) {
    if (isNaN(arg) || !(arg % 1 === 0)) {
      throw new DrawingError('Shape arguments must be integers');
    }
  });

  for (var i = 0; i < this.args.length; i += 2) {
    this.coords.push([parseInt(this.args[i]), parseInt(this.args[i+1])]);
  }

  //console.log('this.coords: ', this.coords);
};

module.exports = Shape;