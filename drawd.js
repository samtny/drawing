"use strict";

var
  http = require('http'),
  _ = require('underscore'),
  DrawingResponse = require('./lib/DrawingResponse'),
  DrawingError = require('./lib/DrawingError'),
  Canvas = require('./lib/Canvas'),
  Line = require('./lib/Line'),
  Rectangle = require('./lib/Rectangle'),
  Bucket = require('./lib/Bucket');

var canvas = null;

var drawd = function (req, res) {
  var drawd = this;

  drawd.respond = function (body, code, ctype) {
    res.writeHead(code || 200, {'Content-Type': ctype || 'application/json'});

    res.end(JSON.stringify(body));
  };

  drawd.GET = function () {
    drawd.respond(canvas);
  };

  drawd.POST = function () {
    req.on('data', function (cmd) {
      try {
        var args = cmd.toString().split(' ');

        switch (args[0].toUpperCase()) {
          case 'C':
            canvas = new Canvas(args.slice(1));
            drawd.respond(canvas);
            break;
          case 'L':
            if (canvas != null) {
              var line = new Line(args.slice(1));

              line.draw(canvas);
              drawd.respond(canvas);
            }
            else {
              drawd.respond('Create a new Canvas first', 400);
            }
            break;
          case 'R':
            if (canvas != null) {
              var rectangle = new Rectangle(args.slice(1));

              rectangle.draw(canvas);
              drawd.respond(canvas);
            }
            else {
              drawd.respond('Create a new Canvas first', 400);
            }
            break;
          case 'B':
            if (canvas != null) {
              var bucket = new Bucket(args.slice(1));

              bucket.draw(canvas);
              drawd.respond(canvas);
            }
            else {
              drawd.respond('Create a new Canvas first', 400);
            }
            break;
          case 'Q':
            drawd.respond('', 200);
            break;
          default:
            break;
        }
      }
      catch (e) {
        if (e instanceof DrawingError) {
          drawd.respond(e.message, 400, 'text/plain');
        }
        else {
          throw e;
        }
      }
    });
  };

  drawd[req.method]();
};

exports.server = http.createServer(drawd).listen(1337, '127.0.0.1');
