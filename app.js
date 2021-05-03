const express = require('express');
const mongoose = require('mongoose');
let bodyParser = require('body-parser')
const addPost = require('./routes/addPost')
const addPostGroup = require('./routes/postsRoutes')
const userRouter = require('./routes/userRoutes')
let uuid;
const jwt =require('jsonwebtoken')
app = express();
const cors =require('cors')
app.use(cors())
const http = require('http').Server(app);
global.io = require('socket.io')(http,{cors: {
    origin: '*',
}});
let broadcaster;
let users =[];
let onlineUser = [];
const conversationServices = require('./services/conversationServices');
const userServices = require('./services/userServices');
const notificationServices = require('./services/notificationService')
const notificationController = require('./routes/notificaitonsRoute')
const ConnectRoutes = require('./routes/ConnectRoutes');
const linkRoutes = require('./routes/linkRoutes');
const groupRoutes = require('./routes/groupRouter');
const conversationRoutes = require('./routes/conversationRoutes');
const commentRoutes = require('./routes/commentsRoutes');
const notification = require('./models/notification');
const { lock } = require('./routes/notificaitonsRoute');


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
app.use('/',addPost)
app.use('/',conversationRoutes)
app.use('/',userRouter)
app.use('/',linkRoutes)
app.use('/',addPostGroup)
app.use('/',commentRoutes)
app.use('/',groupRoutes)
app.use('/',notificationController)
io.on('connection', function (socket) {

  const jwtToken =  socket.handshake.headers.authorization
  if(jwtToken){
  
      const tokenArray = socket.handshake.headers.authorization.split(" ");
      if(tokenArray[1] !='null'){
        let decoded = jwt.verify(tokenArray[1], 'Hey Mr Client')
        socket.join(decoded.id)
        if(!users.includes(decoded.id)){
            users.push(decoded.id)
          }

          const oneUser = userServices.getOneUser(decoded.id).then((res)=>{
            onlineUser = res;
          }).catch(err =>{
            console.log(err)
          })
       socket.on('getUuid',(Uuid=>{
      uuid = Uuid
    }))
    socket.on("broadcaster", (idOnline) => {
      socket.join(socket.id)
      broadcaster = socket.id;
      socket.in(broadcaster).emit("broadcaster");
    });
    socket.on("watcher", () => {
      socket.join(socket.id)

      socket.to(broadcaster).emit("watcher", socket.id);
    });
    socket.on("offer", (id, message) => {
      console.log("offer",id);
      socket.to(id).emit("offer", socket.id, message);
    });
    socket.on("answer", (id, message) => {
      console.log("answer",id);
      socket.to(id).emit("answer", socket.id, message);
    });
    socket.on("candidate", (id, message) => {
      socket.to(id).emit("candidate", socket.id, message);
    });
  socket.on('newDisscu',(value)=>{
  conversation = value.message
  console.log("conversation",conversation);
  if(conversation._id){
    socket.join(conversation._id);
    let notification = {
      user : conversation.message.id,
      notification:{
        context:"sent a message"
      }
    }
    conversationServices.sendMessage(conversation).then(checkConv =>{
      console.log(checkConv,'checkConvcheckConvcheckConvcheckConv');
      notificationServices.createNotification(notification).then(
        ()=>{
     
          socket.broadcast.emit("notificationDetected",notification);
        }).catch(err =>
          console.log(err)
        )
      io.in(conversation._id).emit('receiveMessage',{checkConv});
    }).catch(err =>{
    console.log(err)}) 
  }else{     
    conversationServices.createConversation(conversation).then(
        resultsConv=>{
         let notification = {
           user : conversation.message.id,
           notification:{
             context:"sent a message"
           }
         }
         console.log(resultsConv);
          conversationServices.getOneConversation(resultsConv._id).then(
                results=>{
               
                    userServices.findByFilter(results).then(
                      checkforUser =>{
                          checkforUser.map(user =>{
                      userServices.updateUser(user,results)
                  })
              })
            conversationServices.sendMessage(resultsConv).then(checkConv =>{ 
              socket.join(checkConv._id);
              socket.broadcast.emit("notificationDetected",notification);
              io.in(checkConv._id).emit('receiveMessage',{checkConv});
            }).catch(err =>{
              console.log(err)})
            }).catch(err =>{
              console.log(err)
       })
    })
  }  
      
  })
   
}else{
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