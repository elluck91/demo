var http = require('http');

var handleRequest = function (request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  response.end('Hello World, from minikube 1');
};
var www = http.createServer(handleRequest);
www.listen(8001);
console.log('Server is listening od port 8001.');
