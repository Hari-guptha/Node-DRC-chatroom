const logincon = require("express").Router()
const path = require('path');
const data = require('../models/schema')
const mongoose = require('mongoose')
const passport = require("passport")


// data verify from db using passport.js
logincon.post('/log', passport.authenticate('local-login', {
    successRedirect: '/chatroom',
    failureRedirect: '/login',
    failureFlash: false
}));


module.exports = logincon;