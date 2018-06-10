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

var mongoURI="mongodb://localhost/Mongofiles"
var conn=mongoose.createConnection(mongoURI)
let gfs;
conn.once("open",()=>{
    gfs=Grid(conn.db,mongoose.mongo)
    gfs.collection('fs')
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
                 bukketname:'fs'
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

app.get('/file/:filename', function(req, res){
    gfs.files.findOne({filename: req.params.filename},(err,file)=>{
        if(!file||file.length===0){
            res.status(404).json({msg:'no Onefile found!'})
        }

        else{
            res.json({file:file})
        }
    })

});
app.get('/files',(req,res)=>{
    gfs.files.find().toArray((err,files)=>{
        if(!files||files.length===0){
            res.status(404).json({msg:'no file found!'})
        }

        else{
            res.json(files)
        }
    })
})

app.get('/files/:filename', function(req, res){
    gfs.files.findOne({filename: req.params.filename},(err,file)=>{
        if(!file||file.length===0){
            res.status(404).json({msg:'noimage  found!'})
        }
if(file.contentType==='application/pdf'||'image/jpeg'){
           var readStream=gfs.createReadStream(file.filename)
           readStream.pipe(res)
       }
       else{
res.status(404).json({message:'there is no image'})
       }
        
    })

});






app.listen(8000,function(){
    console.log("hey mongodb......")
})
