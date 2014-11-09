var DrawingError = require('./DrawingError');

var Canvas = function (args) {
  var canvas = this;

  if (args === null || !Array.isArray(args) || args.length !== 2) {
    throw new DrawingError('Invalid number of arguments supplied to Canvas');
  }

  if (isNaN(args[0]) || isNaN(args[1]) || !(args[0] % 1 === 0) || !(args[1] % 1 === 0)) {
    throw new DrawingError('Arguments to Canvas must be integers');
  }

  canvas.pixels = [];
  canvas.w = args[0];
  canvas.h = args[1];

  for (var i = 0; i < canvas.h; i += 1) {
    var row = [];

    for (var j = 0; j < canvas.w; j += 1) {
      row.push(' ');
    }

    canvas.pixels.push(row);
  }
};

module.exports = Canvas;
