var express=require('express');
var router=express.Router()
var book=require('./schema')
router.post('/',(req,res)=>{
   var title=req.body.title;
   var description=req.body.description
   var Author=req.body.Author;
   var  publish=req.body.publish;
   var rating=req.body.ratng;
   var votes=req.body.votes;
   var price=req.body.price;
   var available_stores=req.body.available_stores;
   var newbook=new book()
    newbook.title=title;
    newbook.description=description;
    newbook.Author=Author;
    newbook.publish=publish;
    newbook.rating=rating;
    newbook.price=price;
    newbook.votes=votes;
    newbook.available_stores=available_stores;

book.findOne({'title':title},(err,user)=>{
    if(err){
        throw err;
    }
    if(user){
        res.json({msg:'title already exists'})
        
    }
    else{
        newbook.save((err,data)=>{
            if(err)
                throw err
            res.send(data)
        })
    }
})








})
module.exports=router;