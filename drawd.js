"use strict";

var
  http = require('http'),
  url = require('url'),
  path = require('path'),
  fs = require('fs'),
  _ = require('underscore'),
  DrawingResponse = require('./lib/DrawingResponse'),
  DrawingError = require('./lib/DrawingError'),
  Canvas = require('./lib/Canvas'),
  Line = require('./lib/Line'),
  Rectangle = require('./lib/Rectangle'),
  Bucket = require('./lib/Bucket');

var canvas = null;

var drawd = function (req, res) {
  var drawd = this,
    uri = url.parse(req.url).pathname,
    cwd = process.cwd();

  //console.log('uri:', uri);

  drawd.respond = function (body, code, ctype, binary) {
    code = code || 200;
    ctype = ctype || 'application/json';
    body = ctype == 'application/json' ? JSON.stringify(body) : body;

    if (binary === true) {
      //res.writeHead(200);
      //res.write(body, 'binary');
      //res.end();

      res.writeHead(code, { 'Content-Type': 'text/html' });
      res.end(body);
    } else {
      res.writeHead(code, { 'Content-Type': ctype });
      res.end(body);
    }
  };

  drawd.updateCanvas = function (cmd) {
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
  };

  drawd.serveFile = function (filename) {
    // original idea here; https://gist.github.com/rpflorence/701407

    fs.exists(filename, function(exists) {
      if(!exists) {
        drawd.respond('404 Not Found\n', 404, 'text/plain');

        return;
      }

      if (fs.statSync(filename).isDirectory()) filename += '/index.html';

      fs.readFile(filename, { encoding: 'utf8' }, function(err, file) {
        if(err) {
          drawd.respond(err + '\n', 500, 'text/plain');

          return;
        }

        drawd.respond(file, 200, 'text/html', true);
      });
    });
  };

  drawd.get = function () {
    switch (uri) {
      case '/canvas':
        drawd.respond(canvas);
        break;
      default:
        var filename = path.join(process.cwd() + '/docroot', uri);
        drawd.serveFile(filename);
        break;
    }
  };

  drawd.post = function () {
    switch (uri) {
      case '/canvas':
        req.on('data', drawd.updateCanvas);
        break;
      default:
        break;
    }
  };

  drawd[req.method.toLowerCase()]();
};

exports.server = http.createServer(drawd).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
