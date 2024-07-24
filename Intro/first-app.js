const http = require('http');
const fs = require('fs');

fs.writeFileSync('hello.txt', 'Hello from Node.js');

http.createServer(function (req, res) {
  fs.readFile('hello.txt', function(err, data) {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);