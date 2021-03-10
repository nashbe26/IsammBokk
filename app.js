const express = require('express');
const mongoose = require('mongoose');
let bodyParser = require('body-parser')
const addPost = require('./routes/addPost')

app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);



const ConnectRoutes = require('./routes/ConnectRoutes')



DbUrl="mongodb+srv://nashbe:1234@cluster0.ixjnz.mongodb.net/users?retryWrites=true&w=majority";

mongoose.connect(DbUrl,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true})
.then((res)=>{
    server.listen(3000)
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('socketio', io);

app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index');
})
app.use('/',ConnectRoutes)
app.use('/',addPost)
