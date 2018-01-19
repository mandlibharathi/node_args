var express=require('express');
var app=express();
var bodyParser=require('body-parser')
var mongoose=require('mongoose');
var Employee=require('./Data.js')
mongoose.connect('mongodb://localhost/test');
var db=mongoose.connection;
app.get('/',function(req,res){
    res.send('hello node')
});
app.get('/api/generas',function(req,res){
    Employee.getEmployee(function(err,Employee){
        if(err){
            console.log(err)
        }
        else{
            res.json(Employee)
        }
    })
    
})
app.listen(8000);
console.log('server is running...')
