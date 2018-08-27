var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/box')
var schema=mongoose.Schema
var  userSchema=new schema({
    box:{
        id:String,
        token:String,
    }
})
module.exports=mongoose.model('User',userSchema)