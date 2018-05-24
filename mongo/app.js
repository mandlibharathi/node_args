var express=require('express');
var app=express();
var path=require('path')
var bodyParser=require("body-parser")
var multer=require('multer') 
var gridFsStorage=require('multer-gridfs-storage')
var Grid=require('gridfs-stream')
var crypto=require('crypto')
var mongoose=require('mongoose')
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')
app.use('/asserts',express.static('asserts'))
app.use(express.static('views'))
 
var mongoURI="mongodb://localhost/files"

var conn=mongoose.createConnection("mongoURI")
conn.once("open",()=>{
    var gfs=Grid(conn.db,mongoose.mongo)
    gfs.collection("uploads")
})
//create storage engine
const storage=new gridFsStorage({
    url:mongoURI,
    file:(req,file)=>{
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(16,(err,buf)=>{
                if(err){
                    return reject(err)

                }
             const filename=buf.toString('hex')+path.extname(file.originalname);
             const fileInfo={
                 filename:filename,
                 bukketname:'uploads'
             };
             resolve(fileInfo)
            })
        })
    }
})
 const upload=multer({storage})
 app.get('/',(req,res)=>{
     res.render("index.html")
 })
app.post('/upload',upload.single('file'),(req,res)=>{
 res.json({file:req.file})
})
app.listen(8000,function(){
    console.log("hey mongodb......")
})