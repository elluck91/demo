var express = require('express');
var app = express();
var exports = module.exports = {};
const PORT = 9002;

app.get('/', function (req, res) {
  res.send('DEMO_2 on branch master');
});

var server = app.listen(PORT, function () {
  console.log(`Magic is happening on port ${PORT}`);
});

exports.closeServer = function () {
  server.close();
};