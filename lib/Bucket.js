"use strict";

var DrawingError = require('./DrawingError'),
  Tool = require('./Tool'),
  Point = require('./Point'),
  _ = require('underscore');

Bucket.prototype = new Tool();
Bucket.prototype.constructor = Bucket;
Bucket.prototype.parent = Tool.prototype;

function Bucket (args) {
  var bucket = this;

  bucket.args = args;
  bucket.anchors = 1;
  bucket.coords = [];

  bucket.init();
}
/*
Bucket.prototype.init = function () {
  Tool.prototype.init.call(this);

  this.fillColor = this.args % 2 === 0 ? this.args[this.args.length - 1] : this.fillColor;
};
*/
Bucket.prototype.draw = function (canvas) {
  //console.log('color: ', this.color);
  var x = this.coords[0][0],
    y = this.coords[0][1];

  //console.log('x: ', x, 'y: ', y);

  if (canvas.w >= x > 0 && canvas.h >= y > 0) {

    var queue = [],
      node = new Point([this.coords[0][0], this.coords[0][1]]),
      target_color = node.peek(canvas),
      replacement_color = this.color;

    //console.log('target_color: ', '\'' + target_color + '\'');

    queue.push(node);

    var position = 0;

    while (position < queue.length) {
      var el = queue[position];

      //console.log('el: ', el);

      if (el.peek(canvas) == target_color) {
        var elX = el.coords[0][0],
          elY = el.coords[0][1],
          w = new Point([elX, elY]),
          e = new Point([elX, elY]);

        while (w.peek(canvas) == target_color) {
          w.coords[0][0] -= 1;
        }

        while (e.peek(canvas) == target_color) {
          e.coords[0][0] += 1;
        }

        for (var i = w.coords[0][0] + 1; i < e.coords[0][0]; i += 1) {
          var point = new Point([i, elY, replacement_color]);

          point.draw(canvas);

          var n = new Point([i, elY - 1]),
            s = new Point([i, elY + 1]);

          //console.log('n.peek(canvas)', '\'' + n.peek(canvas) + '\'');
          //console.log('s.peek(canvas)', '\'' + s.peek(canvas) + '\'');
          if (n.peek(canvas) == target_color) {
            //console.log('yo n');
            queue.push(n);
          }
          if (s.peek(canvas) == target_color) {
            //console.log('yo s');
            queue.push(s);
          }
        }
      }

      position += 1;
    }
  } else {
    throw new DrawingError('Bucket coordinate may not be outside canvas');
  }
};

module.exports = Bucket;
