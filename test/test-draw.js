var
  test_data = [
    'C 20 4',
    'L 1 2 6 2',
    'L 6 3 6 4',
    'R 16 1 20 3',
    'B 10 3 o',
    'Q'
  ],
  tests_complete = 0,
  test_log_path = '/tmp/yo',
  test_log = require('fs').createWriteStream(test_log_path),

  spawn = require('child_process').spawn,
  draw = spawn('node', ['../draw.js']),

  assert = require('assert');

draw.stdin.setEncoding('utf8');
draw.stdout.setEncoding('utf8');

var index = 0;

var finish = function () {
  console.log('end');
};

var test = function (data) {
  test_log.write(data, 'utf8');

  if (data.indexOf('enter command:') != -1) {
    if (index == test_data.length - 1) {
      draw.stdin.write(test_data[index] + '\n', 'utf8', finish);
    }
    else {
      draw.stdin.write(test_data[index] + '\n', 'utf8', test);
    }

    index += 1;
  }
};

draw.stdout.on('data', test);

/*

http
  .get('http://localhost:3000/', function (res) {
    assert.equal(200, res.statusCode);

    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      assert.equal('Hello World\n', chunk);

      example.server.close();
    })
  })
  .on('error', function (e) {
    console.log('error: ' + e.message);
  });
*/

