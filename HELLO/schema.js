var mongoose=require('mongoose')
var Schema=mongoose.Schema;
var bookSchema=new Schema({
    title:String,
    description:String,
    Author:String,
    publish:String,
    rating:String,
    price:String,
    votes:Number,
    available_stores:{
type:Array,
"default":[]
    }
})

module.exports=mongoose.model('book',bookSchema)