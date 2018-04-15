var express=require('express');
var query=require('querystring')
var bcrypt=require('bcryptjs')
var router=express.Router();
var book=require('./schema');
router.post('/',(req,res)=>{
var email=req.body.email;
var hashedPassword = bcrypt.hashSync(req.body.password)
var title=req.body.title;
   var description=req.body.description
   var Author=req.body.Author;
   var  publish=req.body.publish;
   var rating=req.body.rating;
   var votes=req.body.votes;
   var price=req.body.price;
   var available_stores=req.body.available_stores;
   var URL=req.body.URL;
   var newbook=new book()
   newbook.email=email;
   newbook.password=hashedPassword;
    newbook.title=title;
    newbook.description=description;
    newbook.Author=Author;
    newbook.publish=publish;
    newbook.rating=rating;
    newbook.price=price;
    newbook.votes=votes;
    newbook.available_stores=available_stores;
    newbook.URL=URL;
    var password=req.body.password
book.findOne({$or:[{'title':title},{'email':email},{'password':password}]},(err,user)=>{
    if(err){
        throw err;
    }
    if(user){
        res.json({msg:'title already exists,email already  exists and password exists'})  
    }
    else{
        newbook.save((err,data)=>{
            if(err){
                throw err
            }
            else{
                res.render('alogin',{user:data})

            }
    
        })	
    }
})
})
    router.post('/login',(req,res,next)=>{
        var email=req.body.email;
        var password=req.body.password;
        book.findOne({'email':email},(err,user)=>{
            if(err){
                res.send(err)
            }
            
             if(!user){
                 res.send({msg:'cannot find user'})
            }
    var passwordIsValid=bcrypt.compareSync(password,user.password)
            if(!passwordIsValid){
                res.setHeader[404]
                res.render('name')
            }
            if(passwordIsValid){
                res.setHeader[200]
                res.render('result',{user:user})  
            }    
        })
    });
router.get('/name/:title',(req,res,next)=>{
    // function isLoggedIn(req, res, next) {
        
    //         // if user is authenticated in the session, carry on 
    //         // var email=req.body.email;
    //         // if (email){
    //         //         res.render('alogin')    
    //         // }     
    //         // // if they aren't redirect them to the home page
    //         // res.redirect('/alogin');
           
    //     } var title=req.body.title;
     var email=req.body.email
    book.findOne({title:req.params.title},(err,user)=>{
if(err){
  res.json({msg:'Sorry. no data found'})
}
 if(user){
     res.render('alogin')
     
}
 else if(!user){
    res.render('Home')
}

next()
})
})
router.get('/',function(req,res,next){ 
    var title=req.body.title;
    var email=req.body.email
   book.find({},(err,user)=>{
if(err){
 next(res.json({msg:'Sorry. no data found'}))
 res.render('Home')
}
 if(user){
    res.render('Home',{
sucessRedirect:'/name'})
 }
if(!user){
   res.render('name')
}
})
})
router.get('/alogin',  (req,res)=>{
    res.render('alogin')
})

router.get('/name.ejs',(req,res)=>{
    res.render('name')
})

router.post('/update',function(req,res,next){
    var votes=req.body.votes;
    var rating =req.body.rating;
    var URL=req.body.URL;
     var title=req.body.title
book.findOneAndUpdate({'title':title},{votes:votes,rating:rating,URL:URL},function(err,user){
       if(err){
           res.status(500).send('there isproblem to find user')
       } 
       if(!user){
           res.status(404).send('no user found')
       }
       if(user){
           res.status(200)
           res.render('result.ejs',{user:user})
       }
    })
}) 
router.get('/statistics.ejs',(req,res)=>{

    book.find({}).exec((err,user)=>{
    if(err){
           res.send({msg:'error'})
        }
        
            res.render('statistics.ejs',{user:user})
})
})
router.get('/login.ejs',(req,res)=>{  
    res.render('login.ejs')
  
})
router.get('/books.ejs',(req,res)=>{
    var title=req.body.title
    book.findOne({'title':title},(err,user)=>{
        if(err){
            res.send('error')
        }
        else{
            res.render('books',{user:user})
        }
    })
})
router.get('/search',(req,res)=>{
    res.render('search')
})
router.post('/search',(req,res)=>{
    var title=req.body.title;
    book.findOne({'title':title},(err,user)=>{
        if(err){
            throw err
        }
        if(!user){
   res.send({msg:'there is no user found'})
        }
        else{
            res.render('result',{user:user})
        }
    })
})
module.exports=router;






