var http=require('http');
http.createServer(function(req,res){
console.log("res " + res.statusCode);
res.end("hello world");
console.log("req " +req.method);
}).listen(8000);
console.log("server is running");
