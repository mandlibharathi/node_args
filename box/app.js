var express=require('express')
var app=express()
var router=require('./router')
var bodyParser=require('body-parser')
var passport=require('passport')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')
var session=require('express-session')
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized:true
  }))
app.use(passport.initialize())
app.use(passport.session())


app.use('/',router)

app.listen(7000,()=>{
    console.log('your server is running')
})