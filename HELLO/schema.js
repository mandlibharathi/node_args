var mongoose=require("mongoose")
var Schema=mongoose.Schema
var bookSchema=new Schema({
    email:String,
    password:String,  
    title:String,
    description:String,
    Author:String,
    publish:String,
    rating:String,
    votes:String,
    price:String,
    available_stores:{
        type:Array,
        default:[],
    },
    date:{
     type:Date,
     default:Date.now
    },

URL:String,
})
module.exports=mongoose.model('book',bookSchema)