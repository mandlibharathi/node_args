var express=require('express')
var router=express.Router()
var BoxSDK = require('box-node-sdk');
var passport=require('passport')
var BoxStrategy=require('passport-box').Strategy
var crypto=require('crypto')
var User=require('./schema')
var fs = require('fs');
var request = require('request');
var path = require('path');


var sdk = new BoxSDK({
    clientID: 'kjoacriwqmkxomgs8vkvxgx718whqphl',
    clientSecret: 'YFRh1LniokcQg9uiyheOjorvnzgiWiqX',
    
  });
  
  // Create a basic API client
  var client = sdk.getBasicClient('JnObw4Hz10YWlmBNzF6Rg2AsoY6Xwvkz');

           
  passport.serializeUser( function(user, done) {
	done(null, user);
});

passport.deserializeUser( function(obj, done) {
	done(null, obj);
});
  passport.use(new BoxStrategy({
    clientID: 'kjoacriwqmkxomgs8vkvxgx718whqphl',
    clientSecret: 'YFRh1LniokcQg9uiyheOjorvnzgiWiqX',
   callbackURL: "http://localhost:7000/auth/box/callback"
  },
//   function( profile, done) {
//     User.find({ boxId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

function(accessToken,verifyToken,profile,cb){
  process.nextTick(function(){
      User.findOne({'boxid':profile.id},function(err,user){
          if(err){
              return cb(err)
          }
          if(user){
              return cb(null,user)
          }
          else{
           var newUser=new User()
           newUser.box.id    = profile.id;
           newUser.box.token = accessToken;
           newUser.box.name= profile.displayName;
           //newUser.box.email=profile.emails[0].value
           newUser.save(function(err){
                  if(err){
                      throw err
                  }
                  else{
                      cb(null,newUser)
                  }
              })   
                 
          }
      })
   })
}))
 
router.get('/', function(req, res){
    res.render('index', { user: req.user });
  });
  router.get('/auth/box',
  passport.authenticate('box'),
  function(req, res){
    // The request will be redirected to Box for authentication, so this
    // function will not be called.
  });

  router.get('/login', function(req, res){
    res.render('login', { user: req.user });
  });
  router.get('/upload', function(req, res){
    res.render('upload');
  });
  
   
  router.get('/auth/box/callback', 
  passport.authenticate('box', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/upload');
  });
  var fs = require('fs');
  var stream = fs.createReadStream('/home/gcr/Documents/resume.pdf');
  var folderID = "0";

  client.files.uploadFile(folderID, 'resume.pdf', stream)
      .then(file => {
          // ...
      });

//     router.post('/upload',(req,res,file)=>{
// //var filename=req.body
// var stream = fs.createReadStream(path.join(req.file.filename));
//   var folderID = "0";

//   client.files.uploadFile(folderID,stream)
//       .then(file => {
       
//       })
        
//         });
            
        
    
 module.exports=router