"use strict";

var
  http = require('http'),
  _ = require('underscore'),
  DrawingError = require('./lib/DrawingError'),
  Canvas = require('./lib/Canvas');

var canvas = null;

var drawd = function (req, res) {
  var drawd = this;

  drawd.respond = function (body, code) {
    res.writeHead(code || 200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(body));
  };

  drawd.GET = function () {
    drawd.respond(canvas);
  };

  drawd.POST = function () {
    req.on('data', function (cmd) {
      try {
        var args = cmd.toString().split(' ');

        switch (args[0]) {
          case 'C':
            canvas = new Canvas(args.slice(1));
            break;
          case 'L':
            if (canvas != null) {
              canvas.draw(new Line(args.slice(1)));
            }
            else {
              drawd.respond('Create a new Canvas first', 400);
            }
            break;
          default:
            break;
        }

        drawd.respond(canvas);
      }
      catch (e) {
        if (e instanceof DrawingError) {
          drawd.respond(e.message, 400);
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
