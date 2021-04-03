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
app.use('/',conversationRoutes)
app.use('/',userRouter)

io.on('connection', function (socket) {
      const jwtToken =  socket.handshake.headers.authorization
      if(jwtToken){
        console.log('************ connect from room ************')
        const tokenArray = socket.handshake.headers.authorization.split(" ") 
        if(tokenArray[1] !='null'){
          let decoded = jwt.verify(tokenArray[1], 'Hey Mr Client')
          socket.join(decoded.id)
          if(!users.includes(decoded.id)){
            users.push(decoded.id)
          }
          console.log(users)
          const oneUser = userServices.getOneUser(decoded.id).then((res)=>{
            console.log(res)
            onlineUser = res;
          }).catch(err =>{
            console.log(err)
          })
          socket.on('newDisscu',(message)=>{

            
            if(messages[decoded.id] == null)
              messages[decoded.id] = [];
              
              messages[decoded.id].push(message)
              console.log(message);
              conversationServices.sendMessage(message).then(
                results=>{
                  console.log(results)
                }
              )
            console.log(messages)
          })
        }else{
          socket.disconnect()
          console.log('from connect this is disconnected scoket rooms',socket.rooms)
        }
      }
      
      socket.to('605d1cd1bd95f31ad8005d22').emit('receiveMessage',{messages})
      socket.on('disconnect',()=>{
        console.log('************ disconnect from room ************')
        console.log('disconnected')
        console.log('this is disconnected scoket rooms',socket.rooms)
      })
      io.emit('userOnline',{users})   
      socket.emit('currentOnlineUser',{onlineUser})  
      socket.emit('ConnectionChanges',data =>{
        console.log(data)
      })     
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
   console.log(`room ${room} was deleted`);
   console.log(room)
   console.log(users)
   users = users.filter(x=>(
    x !=room
 ))
   console.log(  'nashbe fesed', users)
    
   });