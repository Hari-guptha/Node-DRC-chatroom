const route = require('express').Router();

route.get("/",(req,res)=>{
    res.render("index.ejs")
})

route.get("/login",(req,res)=>{
    res.render("login.ejs")
})

route.get("/signup",(req,res)=>{
    res.render("signup.ejs")
})

route.get("/photo",(req,res)=>{
    res.render("photo.ejs")
})

route.get("/chatroom",(req,res)=>{
    res.render("chat.ejs")
})



module.exports = route;