var express = require('express');
var app = express();
var exports = module.exports = {};
const PORT = 9001;

app.get('/', function(req, res){
  res.send('DEMO_1');
});

var server = app.listen(PORT, function(){
  console.log(`The Magic is happening on port ${PORT}`);
});

exports.closeServer = function(){
  server.close();
};