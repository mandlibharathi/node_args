var express=require('express')
var path=require('path')
var bodyParser=require('body-parser')
var cors=require('cors')
//connected dbsss
require('./config/db')
var poll=require('./routes/poll')
var app=express();
//set public folder
app.use(express.static(path.join(__dirname,'public')))

//BodyParser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//Enable cors
app.use(cors())

app.use('/poll',poll)

const port=8080
app.listen(port,()=>{
    console.log(`server is running ${port}`)
})
   
