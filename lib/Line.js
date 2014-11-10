"use strict";

var DrawingError = require('./DrawingError'),
  Point = require('./Point'),
  Shape = require('./Shape');

Line.prototype = new Shape();
Line.prototype.constructor = Line;

function Line (args) {
  var line = this;

  line.args = args;
  line.anchors = 2;
  line.coords = [];

  line.init();
}

Line.prototype.draw = function (canvas) {
  var x1 = this.coords[0][0],
    y1 = this.coords[0][1],
    x2 = this.coords[1][0],
    y2 = this.coords[1][1],
    deltaY = y2 - y1,
    deltaX = x2 - x1;

  //console.log('deltaX: ', deltaX, 'deltaY: ', deltaY);

  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    var slope = deltaY / deltaX;

    for (var i = 0; i <= Math.abs(deltaX); i += 1) {
      var coordX = x1 + i * (deltaX == 0 ? 0 : deltaX / Math.abs(deltaX));
      var coordY = Math.round(y1 + i * (deltaX > 0 ? 1 : -1) * (deltaY > 0 ? 1 : -1) * (deltaY == 0 ? 0 : deltaY / Math.abs(deltaY)) * (slope == Number.POSITIVE_INFINITY ? 1 : slope));

      //console.log('coordX: ', coordX, 'coordY: ', coordY);
      var point = new Point([coordX, coordY]);

      point.draw(canvas);
    }
  } else {
    var slope = deltaX / deltaY;

    for (var i = 0; i <= Math.abs(deltaY); i += 1) {
      var coordY = y1 + i * (deltaY == 0 ? 0 : deltaY / Math.abs(deltaY));
      var coordX = Math.round(x1 + i * (deltaX == 0 ? 0 : deltaX / Math.abs(deltaX)) * (slope == Number.POSITIVE_INFINITY ? 1 : slope));

      var point = new Point([coordX, coordY]);

      point.draw(canvas);
    }
  }
};

module.exports = Line;
