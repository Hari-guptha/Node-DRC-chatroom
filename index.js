//main librarys
const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const http = require('http').createServer(app);
// passport librarys
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")

// routes
const route = require('./routes/route');
const sig = require('./models/schema');
const control = require('./controller/signup')
const logincon = require('./controller/login')


app.use(express.urlencoded({ extended: true }))//message encoder
//set app to view static views folder
app.set('view engine', 'ejs');
app.use(express.static("views"))
app.use(express.static("assets"))

// connect mongo db compose
const mongo = "mongodb+srv://titan:titan@cluster0.enx2glq.mongodb.net/chatroom?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("db connected")
    http.listen(3005, () => {
        console.log("server is running in port 3005")
    })
}).catch(err => console.log(err))

// set passport to the node application
require("./passport/passport")()
app.use(session({
    secret: 'code',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/chatroom-db"
    })
}))
//passport  initialized
app.use(passport.initialize())
app.use(passport.session())

// logout and end the session
app.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout(function (err) {
            if (err) { return next(err); }
            req.session.destroy();
            res.redirect('/');
        });
    }
    else {
        res.redirect('/');
    }
})

// start from home page
app.get("/", (req, res) => {
    res.render("index.ejs");
})

// use default routes
app.use(route)
app.use(control)
app.use(logincon)

const io = require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log("connected....")
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})
