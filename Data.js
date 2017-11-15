var mongoose=require('mongoose');
var Employeeschema=mongoose.Schema({
   name :{
        type:String,
        required:true
    }
})
var Employee=module.exports=mongoose.model('Employee',Employeeschema)
module.exports.getEmployee=function(callback,limit){
    Employee.find(callback).limit(limit)
}
