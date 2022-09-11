const passport = require("passport")
const localstrategy = require("passport-local").Strategy
const schema = require("../models/schema")
module.exports = () => {
    console.log("ur  in  passport.js ")
    passport.serializeUser((schemas, done) => {
        console.log("inside serialize", schemas)
        done(null, schemas.id)
    })
    passport.deserializeUser((id, done) => {
        console.log("inside deserialize", id)
        schema.findById(id, (err, schemas) => {
            done(err, schemas)
        })
    })
    //passport stratergy
    passport.use("local-login", new localstrategy((username, password, done) => {
        console.log(username);
        schema.findOne({ "username": username }, (err, schemas) => {

            if (err) { return done(err) }
            if (!schemas) {
                return done(null, false, { message: "Incorrect user name" })
            }

            if (schemas.password == password) {
                return done(null, schemas)
            }
            else {
                return done(null, false, { message: "Incorrect Password" })
            }
            // bcrypt.compare(password,schemas.password,(err,res)=>{
            //     if(err){return done(err)}
            //     if(res==false){return  done(null,false,{message:"incorrect password"})}
            // return done(null,schemas)
            // })
        })
    }))
}