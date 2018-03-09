var mongoose=require('mongoose')
var Schema=mongoose.Schema;
var bookSchema=new Schema({
    title:String,
    name:String,
},
    {
        timpstamps:true
    
})
module.exports=mongoose.model('book',bookSchema)