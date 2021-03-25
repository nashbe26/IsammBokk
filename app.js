const express = require('express');
const mongoose = require('mongoose');
let bodyParser = require('body-parser')
const addPost = require('./routes/addPost')
const jwt =require('jsonwebtoken')
app = express();
const cors =require('cors')
app.use(cors())
const http = require('http').Server(app);
const io = require('socket.io')(http,{cors: {
    origin: '*',
}});



const ConnectRoutes = require('./routes/ConnectRoutes')



DbUrl="mongodb+srv://nashbe:1234@cluster0.ixjnz.mongodb.net/users?retryWrites=true&w=majority";

mongoose.connect(DbUrl,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true})
.then((res)=>{
    http.listen(3000)
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

io.on('connection', function (socket) {
      const jwtToken = socket.handshake.headers.authorization
      if(jwtToken){
        console.log(jwtToken)
        const tokenArray = jwtToken.split(" ")
        var decoded = jwt.verify(tokenArray[1], 'Hey Mr Client');
        socket.join(decoded.id);
      }
      
    
    socket.on( 'new_notification', function( data ) {
      console.log(data.title,data.message);
      io.sockets.emit( 'show_notification', { 
        title: data.title, 
        message: data.message, 
        icon: data.icon, 
      });
      socket.on('disconnect',function(){
        jwtToken=""
        console.log('you are disconnected')
        console.log(socket.handshake.headers.authorization)
      })
    });
  });
