var  mongoose=require('mongoose')
const Schema=mongoose.Schema
const Voteschema=new Schema({
    os:{
        type:String,
        required:true
    },
    points:{
        type:String,
        required:true
    }
})

const Vote=mongoose.model('Vote',Voteschema) 

module.exports=Vote