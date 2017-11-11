var express=require('express');
var bodyParser=require('body-parser');

var app=express();
app.use(bodyParser.json({type:"application/json"}));

var person={
name:"xxxx",
age:22
}
app.get('/',function(req,res){
res.send(person);
})
app.listen(8000);
console.log("server is running");
