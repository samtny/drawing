"use strict";

var
  http = require('http'),
  drawd = require('./drawd'),
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

var requestCallback = function (res) {
  res.setEncoding('utf8');

  res.on('data', function (chunk) {
    if (res.statusCode === 200) {
      printCanvas(chunk);
    } else {
      console.log(chunk);
    }

    rl.prompt(true);
  });
};

var send = function (cmd) {
  var options = {
    hostname: 'localhost',
    port: 1337,
    path: '/',
    method: 'POST'
  };

  var req = http.request(options, requestCallback);

  req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
  });

  req.write(cmd);

  req.end();
};

var noop = function () {
  rl.prompt(true);
};

var quit = function () {
  drawd.server.close(function () {
    rl.close();
  });
};

var sendLine = function (cmd) {
  switch (cmd) {
    case 'Q':
      quit();
      break;
    case '':
      noop();
      break;
    default:
      send(cmd);
      break;
  }
};

readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout);

rl.on('line', sendLine);
rl.setPrompt('enter command: ');
rl.prompt(true);
