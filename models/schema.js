const mongoose = require('mongoose')
const schema = mongoose.Schema

const sign = new schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: false,
    },

    password:{
        type: Number,
        required: true,
    }
})

const sig = mongoose.model("sig",sign)
module.exports = sig;