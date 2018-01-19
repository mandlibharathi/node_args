var express=require('express')
var app=express()
var bodyparser=require('body-parser');
var path=require('path')
app.use(bodyparser.urlencoded({extended:false}))
app.get('/',function(req,res){
    var data={
        name:'hello',
        age:24
    }
    res.send(data)
})
app.get('/hello',function(req,res,next){

    console.log('the req us recived at :',res.statusCode,Date.apply('DD-MM-YY'))
    
    next()
})
app.get('/name/:id([0-9.a-z]{1})',function(req,res){
    res.send('your id is :'+req.params.id )
    //else
    app.get('*',function(req,res){
        res.send('sorry id is not defined')
    })

})
app.use(express.static(path.join(__dirname,'public')))


app.get('/hello',function(req,res){

    res.send('hello Nodejs')
    
})
app.post('/hello',function(req,res){
    var name={
        fname:'Abhilash',
        lastname:'reddy'
    }
    res.send('hello my name is : ' +name.fname +name.lastname)
})
app.listen(8000,function(){
    console.log('server is running..')
})




