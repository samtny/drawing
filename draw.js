"use strict";

var
  http = require('http'),
  drawd = require('./drawd'),
  canvas = null,
  readline = require('readline'),
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

var printChar = function (char, times, stream) {
  times = times || 1;
  stream = stream || process.stdout;

  for (var i = 0; i < times; i += 1) {
    stream.write(char);
  }
};

var printCanvas = function (chunk) {
  //console.log(chunk);

  var canvas = JSON.parse(chunk),
    pixels = canvas.pixels,
    w = parseInt(canvas.w),
    h = parseInt(canvas.h);

  for (var i = 0; i < h; i += 1) {
    var row = pixels[i];

    if (i == 0) {
      printChar('-', w + 2);
      printChar('\n');
    }

    printChar('|');
    for (var j = 0; j < w; j += 1) {
      process.stdout.write(row[j]);
    }
    printChar('|\n');

    if (i == h - 1) {
      printChar('-', w + 2);
      printChar('\n');
    }
  }
};

var sendLine = function (cmd) {
  if (cmd !== 'Q') {
    var options = {
      hostname: 'localhost',
      port: 1337,
      path: '/',
      method: 'POST'
    };

    var req = http.request(options, function (res) {
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        if (res.statusCode === 200) {
          printCanvas(chunk);
        } else {
          console.log(chunk);
        }

        rl.prompt(true);
      });
    });

    req.on('error', function (e) {
      console.log('problem with request: ' + e.message);
    });

    req.write(cmd);

    req.end();
  } else {
    drawd.server.close(function () {
      rl.close();
    })
  }
};

readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout);

rl.on('line', sendLine);
rl.setPrompt('enter command: ');
rl.prompt(true);
