var express = require('express');

var app = express(); //.createServer(express.logger());

app.use("/", express.static(__dirname + '/web'));

/*app.get('/', function(request, response) {
  var fs = require('fs');
  var buf = fs.readFileSync('index.html');
  response.send(buf.toString());
  //response.send('Hello World 2!');
});
*/
var port = process.argv[2] || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

