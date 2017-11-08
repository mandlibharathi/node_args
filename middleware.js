var express=require('express');
var app=express();
app.use('/',function(req,res,next){
    console.log("the request is :" +req.method +'\n' +"andd"   + req.url);

next()
})
app.get('/',function(req,res){
    res.send("hello world")
})
app.listen(8000);
console.log("here is some data")

