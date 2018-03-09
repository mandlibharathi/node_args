var express=require('express');
var router=express.Router()
var book=require('./schema')
router.get('/',(req,res)=>{
    book.find((err,user)=>{
        if(err) throw err
            else{
                res.send(user)
            }
    })

})
router.post('/',(req,res)=>{
    var title=req.body.title;
    var name=req.body.name;
    var newbook=new book
    newbook.title=title;
    newbook.name=name;
    newbook.save((err,data)=>{
if(err) throw err
    else{
        res.json(data)
    }
    })

})
module.exports=router;