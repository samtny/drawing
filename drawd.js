var
  http = require('http');

var drawd = function (req, res) {
  var self = this,
    canvas = ['-', 'x', 'o'];

  if (req.method == 'GET') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(canvas));
  }
};

exports.server = http.createServer(drawd).listen(1337, '127.0.0.1');
