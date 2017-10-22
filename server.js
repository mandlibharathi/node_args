var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
});
app.route('/node').get(function(req,res){
res.send('welcome to nodejs');
});

var server = app.listen(8081)
console.log('server is runing at http://localhost:8081');
