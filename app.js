const express = require('express');
const mongoose = require('mongoose');
let bodyParser = require('body-parser')
const addPost = require('./routes/addPost')
const userRouter = require('./routes/userRoutes')
const jwt =require('jsonwebtoken')
app = express();
const cors =require('cors')
app.use(cors())
const http = require('http').Server(app);
const io = require('socket.io')(http,{cors: {
    origin: '*',
}});
let messages=[];
let users =[];
let onlineUser = [];
const conversationServices = require('./services/conversationServices');
const userServices = require('./services/userServices');

const ConnectRoutes = require('./routes/ConnectRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

//DbUrl="mongodb://localhost:27017";
DbUrl="mongodb+srv://nashbe:1234@cluster0.ixjnz.mongodb.net/users?retryWrites=true&w=majority";

mongoose.connect(DbUrl,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true, useFindAndModify: false,})
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
app.use('/',conversationRoutes)
app.use('/',userRouter)

io.on('connection', function (socket) {
  const jwtToken =  socket.handshake.headers.authorization
    if(jwtToken){
        const tokenArray = socket.handshake.headers.authorization.split(" ") 
        if(tokenArray[1] !='null'){
          let decoded = jwt.verify(tokenArray[1], 'Hey Mr Client')
          socket.join(decoded.id)
          if(!users.includes(decoded.id)){
            users.push(decoded.id)
          }
          console.log(users)
          const oneUser = userServices.getOneUser(decoded.id).then((res)=>{
            onlineUser = res;
          }).catch(err =>{
            console.log(err)
          })
        console.log(messages);
        socket.on('newDisscu',({message})=>{
          conversationServices.getOneConversation(message._id).then(
            results =>{
              console.log(results);
              conversationServices.sendMessage(results,message).then(
                ()=>{
                  messages.push(message.message.content);
                  io.emit('receiveMessage',{messages});
                })
            })
           
    })}else{
          socket.disconnect() 
        }
      }
      socket.on('disconnect',()=>{
        console.log('this is disconnected scoket rooms',socket.rooms)
      })
      io.emit('userOnline',{users})   
      socket.broadcast.emit('currentOnlineUser',{onlineUser})  
      socket.on( 'new_notification', function( data ) {
      console.log(data.title,data.message);
      io.sockets.emit( 'show_notification', { 
        title: data.title, 
        message: data.message, 
        icon: data.icon, 
      });
      });
  });
io.of("/").adapter.on("delete-room", (room) => {
  console.log('************ disconnect ************')
  users = users.filter(x=>(
    x !=room
 ))
 messages = [];
   console.log(  'nashbe fesed', users)
    
   });