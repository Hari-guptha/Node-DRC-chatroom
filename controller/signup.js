const express = require("express").Router()
const path = require('path');
const data = require('../models/schema') 
const mongoose = require('mongoose')


express.post("/sig", (req,res)=>{
    if(req.body.password == req.body.confpassword){
        const signup = new data(req.body)
        signup.save().then(()=>{
            res.redirect("/login")
        }).catch(err => console.log(err));
    }
    else{
        res.redirect("/signup")
    }
})
module.exports = express;