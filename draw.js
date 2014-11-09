var
  http = require('http'),
  drawd = require('./drawd'),
  readline = require('readline'),
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

rl.on('line', function (cmd) {
  var options = {
    hostname: 'localhost',
    port: 1337,
    path: '/',
    method: 'POST'
  };

  var req = http.request(options, function (res) {
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      console.log(chunk);

      rl.prompt(true);
    })
  });

  req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
  });

  req.write(cmd);

  req.end();
});

readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout);

rl.setPrompt('enter command: ');
rl.prompt(true);
