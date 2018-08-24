var express=require('express');
var app=express();
var mongoose=require('mongoose')
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');

var file=require('./FileTableSchema')
//var passport=require('passport')
var URL='mongodb://localhost:27017/password'
mongoose.connect(URL,(err)=>{
    if(err){
        throw err;
    }
    else{
        console.log('connected...')
    }
})

var db=mongoose.connection;
var bcrypt=require('bcryptjs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
var db=mongoose.connection
app.post('/file',(req,res)=>{
    var filename=req.body.filename;
    var filepath=req.body.filepath;
    //var fileversion=req.body.fileversion;
    var filesize=req.body.filesize;
    var Created=req.body.Created;
    var Modified=req.body.Modified;
    var ContainerOwner=req.body.ContainerOwner

    var NEWFILE=new file();
       NEWFILE.filename=filename;
      NEWFILE.filepath=filepath;
      //NEWFILE.fileversion=fileversion;
      NEWFILE.filesize=filesize;
      NEWFILE.Created=Created;
     NEWFILE.Modified=Modified;
     NEWFILE.ContainerOwner=ContainerOwner;
  
file.findOne({filename:filename},(err,File)=>{
    if(err){
        res.status(404).json({msg:'sorry file not found'})
    }
    if(File){
        res.json({message:'Opps! filename already taken. '})
    }
    else{
        NEWFILE.save({ validateBeforeSave: false},(err,savedfile)=>{
            if(err)
            throw err;
            res.send(savedfile)
    
        })
    }
})
})
app.get('/file',(req,res)=>{
    var filename=req.body.filename;
    file.find({},(err,file)=>{
        if(err){
            res.json({msg:'some error is there!'})
        }
        else{
            res.json(file)
        }
    })
})

    
app.put('/api/update',function(req,res){
    var filesize=req.body.filesize;
   // var fileversion=req.body.fileversion;
    var filename=req.body.filename
    file.findOneAndUpdate({filename:filename},{filesize:filesize},function(err,user){
       if(err){
           res.status(500).send('there isproblem to find user')
       } 
       if(!user){
           res.status(404).send('no user found')
       }
       else {
           res.status(200).send('updated sucessfully' +user)
       }

       
       
    })
})   
// })
// var counters = db.collection('files')
// //var filename = req.body.filename;
// var order = [['_id','asc']];
// var inc = {$inc:{'fileversion':1.0}};
// var options = {new: true, upsert: true}

// app.put('/FILE/update',(req,res)=>{
//     var filename = req.body.filename;
//     counters.findOneAndUpdate({filename:filename}, order, inc, options, function(err, doc) {

//         if(err) {
//          throw (err);
//           return;
//         }      
      
//         var id = doc.next;
//         res.status(200).send((null, id));
//       });
 
// })


app.put('/File/Update',(req,res)=>{
var filename=req.body.filename;
file.findOneAndUpdate({fileID:'1'}, { $set: { flashcards : { $each: file }}}, {upsert : true,default:1.0}, function(err, doc) {
        if(err) { return console.log(err); }
        else { return res.send(doc);}
    });
})
       
   

app.listen(5000,()=>{
    console.log("Hey! your server is running on Port:5000. Lets check it.")
})