var express=require('express');
var cookieParser=require('cookie-parser');
var app=express();
app.use(cookieParser());
app.get('/',function(req,res){
    res.cookie('name','cookie')
    console.log(req.cookies)
    res.send('welcome to express');

})
app.listen(7000);
console.log("server is running at http://localhost:7000")
