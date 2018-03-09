let express=require('express')
var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/book')
var db=mongoose.connection;
db.on('error',(err)=>{
    if(err) throw err
        else{
            console.log('server is connected...S')
        }
})

let app=express();
var Router=require('/home/gcr/Desktop/HELLO/router.js')
var bodyParser=require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/',Router)
app.listen(5000,()=>{
    console.log(`server is connected 
    sucessfully`)
})