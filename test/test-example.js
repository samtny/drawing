var
  assert = require('assert'),
  http = require('http'),
  example = require('../example'),
  callbackFired = false;

example.server.listen(3000);

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

