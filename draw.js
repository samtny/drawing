var
  http = require('http'),
  drawd = require('./drawd'),
  readline = require('readline'),
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

rl.on('line', function (cmd) {
  var req = http.request({
    host: '127.0.0.1',
    port: 1337
  }, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('JSON.parse(chunk)[1]', JSON.parse(chunk)[1]);

      rl.prompt(true);
    })
  });

  req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
  });

  req.end();
});

rl.setPrompt('enter command: ');

rl.prompt(true);
