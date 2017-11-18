var mongoose=require('mongoose');
var Employeeschema=mongoose.Schema({
    empname :{
        type:String,
        required:true
    },
    age :{
        type:Number,
        required:true
    },
    salary :{
        type:Number,
        required:true
    }
})
var Employee=module.exports=mongoose.model('Employee',Employeeschema)
module.exports.getEmployee=function(callback,limit){
    Employee.find(callback).limit(limit)
}
