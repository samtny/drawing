"use strict";

var DrawingError = require('./DrawingError'),
  _ = require('underscore');

var Tool = function (args) {
  var tool = this;

  tool.args = args;
  tool.anchors = null;
  tool.coords = [];
  tool.color = 'x';
};

Tool.prototype.init = function () {
  if (this.anchors === null || isNaN(this.anchors)) {
    throw new DrawingError('Tool has undefined property \'anchors\'');
  }

  //console.log('this.args', this.args);
  if (this.args === null || !Array.isArray(this.args) || this.args.length < this.anchors * 2 || this.args.length > this.anchors * 2 + 1) {
    throw new DrawingError('Invalid number of arguments specified; Expected ' + this.anchors * 2);
  }

  _.each(this.args, function (arg, index, tool) {
    if (index < this.anchors * 2) {
      if (isNaN(arg) || !(arg % 1 === 0)) {
        throw new DrawingError('Tool arguments must be integers');
      }
    }
  }, this);

  for (var i = 0; i < this.args.length; i += 2) {
    this.coords.push([parseInt(this.args[i]), parseInt(this.args[i+1])]);
  }

  this.color = (this.args.length % 2 === 0 ? this.color : this.args[this.args.length - 1]);
};

module.exports = Tool;
