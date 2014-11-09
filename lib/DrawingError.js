var DrawingError = function (message) {
  this.name = 'DrawingError';
  this.message = message || 'A drawing error occurred';
};

DrawingError.prototype = new Error();
DrawingError.prototype.constructor = DrawingError;

module.exports = DrawingError;
