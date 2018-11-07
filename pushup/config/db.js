var mongoose=require('mongoose')
mongoose.Promise=  global.Promise;
mongoose.connect('mongodb://jan:jan123@ds151863.mlab.com:51863/jan')

.then(()=>console.log("Mongodb connected"))
.catch(err=>console.log(err))