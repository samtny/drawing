var
  http = require('http'),
  readline = require('readline'),
  interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

interface.question('yo', function (answer) {
  console.log('yo back');

  interface.close()
});

exports.server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
})//.listen(1337, '127.0.0.1');
//console.log('Server running at http://127.0.0.1:1337/');


