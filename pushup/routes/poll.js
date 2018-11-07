var express=require('express')
var router=express.Router()
var pusher = require('pusher');
var mongoose=require('mongoose')
var Vote=require('../models/votes')
//insert values to pusher
var pusher = new pusher({
    appId: '639574',
    key: '3bab4e48c2b67cb4735e',
    secret: 'd8a4af4ca09398c53ce4',
    cluster: 'ap2',
    encrypted: true
  });
  

 router.get('/',(req,res)=>{
   Vote.find().then(votes=>res.json({sucess:true,votes:votes}))

})
 router.post('/',(req,res)=>{
const newVote={
  os:req.body.os,
  points:1
}
new Vote(newVote).save().then(vote=>{
  pusher.trigger('os-poll', 'os-vote', {
    points:parseInt(vote.points),
    os:vote.os
   });
 return res.json({sucess:true,message:'Thank you  for voting'})
})
})
module.exports=router;