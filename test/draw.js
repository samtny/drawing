var
  test_data = [
    ['C 20 4',
      '                    ' +
      '                    ' +
      '                    ' +
      '                    '
    ],
    ['L 1 2 6 2',
      '                    ' +
      'xxxxxx              ' +
      '                    ' +
      '                    '
    ],
    ['L 6 3 6 4',
      '                    ' +
      'xxxxxx              ' +
      '     x              ' +
      '     x              '
    ],
    ['R 16 1 20 3',
      '               xxxxx' +
      'xxxxxx         x   x' +
      '     x         xxxxx' +
      '     x              '
    ],
    ['B 10 3 o',
      'oooooooooooooooxxxxx' +
      'xxxxxxooooooooox   x' +
      '     xoooooooooxxxxx' +
      '     xoooooooooooooo'
    ],
    ['Q',
      ''
    ]
  ],
  drawd = require('../drawd'),
  http = require('http'),
  assert = require('assert'),
  _ = require('underscore'),
  complete = 0;

_.each(test_data, function (test_item) {
  var command = test_item[0],
    reference = test_item[1];

  var options = {
    hostname: 'localhost',
    port: 1337,
    path: '/',
    method: 'POST'
  };

  var validate = function (res) {
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      if (res.statusCode === 200) {
        var canvas = JSON.parse(chunk);

        var joined = _.reduce(canvas.pixels, function (memo, row) {
          return memo + _.reduce(row, function (memo, item) {
            return memo + item;
          })
        }, '');

        assert.equal(joined, reference);

        complete += 1;

        if (complete == test_data.length) {
          drawd.server.close();
        }
      }
    });
  };

  var req = http.request(options, validate);

  req.write(command);

  req.end();
});
