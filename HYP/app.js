var  express=require('express')
var app=express(); 
var bodyParser=require('body-parser');
var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/book')
var db=mongoose.connection;
db.on('error',(err)=>{
    if(err) throw err
        else{
console.log('server is connected...')
        }
})
var Router=require('./../HELLO/router.js')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
//app.use(express.methodOverride())
 app.use('/asserts',express.static('asserts'))

app.use('/',Router)
// app.use('/books',Router)
app.listen(5000,()=>{
   console.log(`server is connected 
     sucessfully`)
})