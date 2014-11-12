"use strict";

var
  http = require('http'),
  url = require('url'),
  Canvas = require('./lib/Canvas'),
  ToolBox = require('./lib/ToolBox'),
  DrawingError = require('./lib/DrawingError'),
  st = require('st'),
  mount = st({ path: __dirname + '/docroot', url: '/' }),
  canvas = null;

var drawd = function (req, res) {
  var drawd = this,
    uri = url.parse(req.url).pathname,
    toolbox = new ToolBox();

  drawd.respond = function (body, code, ctype) {
    code = code || 200;
    ctype = ctype || 'application/json';
    body = ctype == 'application/json' ? JSON.stringify(body) : body;

    res.writeHead(code, {'Content-Type': ctype});
    res.end(body);
  };

  drawd.execute = function (input) {
    try {
      var explode = input.toString().trim().split(' '),
        command = explode[0].toUpperCase(),
        args = explode.slice(1);

      switch (command) {
        case 'C':
          canvas = new Canvas(args);
          drawd.respond(canvas);

          break;
        case 'Q':
          process.exit();

          break;
        default:
          if (canvas !== null) {
            toolbox.createTool(command, args).draw(canvas);

            drawd.respond(canvas);
          }
          else {
            drawd.respond('Create a new Canvas first', 400, 'text/plain');
          }

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

  drawd.serve = function () {
    var stHandled = mount(req, res);

    if (!stHandled) {
      drawd.respond('Not a static file', 400, 'text/plain');
    }
  };

  drawd.get = function () {
    switch (uri) {
      case '/canvas':
        drawd.respond(canvas);

        break;
      default:
        if (req.url === '/') {
          req.url = '/index.html';
        }

        drawd.serve();

        break;
    }
  };

  drawd.post = function () {
    switch (uri) {
      case '/canvas':
        req.on('data', drawd.execute);

        break;
      default:

        break;
    }
  };

  drawd[req.method.toLowerCase()]();
};

exports.server = http.createServer(drawd).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
