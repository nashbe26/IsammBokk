const express = require('express');
const mongoose = require('mongoose');
let bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const addPost = require('./routes/addPost');
const addPostGroup = require('./routes/postsRoutes');
const userRouter = require('./routes/userRoutes');
const backofficeRouter = require('./routes/backofficeRoute');
const jwt =require('jsonwebtoken');
var path = require('path')

const emmitter = require('./services/eventBus')


app = express();
const cors =require('cors');
app.use(cors());
var multer  = require('multer')

const http = require('http').Server(app);
io = require('socket.io')(http,{cors: {
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
const upvoteRoutes = require('./routes/upvotesRoutes');
const userFeedRoutes = require('./routes/userFeed');
const coursRouter = require('./routes/coursRouter');
const homeworkRouter = require('./routes/homeworkRoutes');
const homeworkResponseRouter = require('./routes/responseHomework');

 let sockets = [];
 let not = []

DbUrl="mongodb+srv://nashbe:1234@cluster0.ixjnz.mongodb.net/users?retryWrites=true&w=majority";

mongoose.connect(DbUrl,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true, useFindAndModify: false,})
.then((res)=>{
    http.listen(3000)
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('socketio', io);
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));





 function verifyToken(req,res,next){
//   console.log("ssssssss",req.headers.authorization);
//   if (!req.headers.authorization){
//     return res.status(401).send('unauthorization request');
//   }
//   let token = req.headers.authorization.split(" ");
 
//   if(token[1]== 'null'){
//     return res.status(401).send('unauthorization request');
//   }

//   try{
//     let payload = jwt.verify(token[1], 'Hey Mr Client',function(err, decoded) {
//   if (err) {
    
//     console.log(err);
//       err = {
//         name: 'TokenExpiredError',
//         message: 'jwt expired',
//         expiredAt: 1408621000
//       }
//       return res.status(401).send('unauthorization request');
//     }
    
//   })
//     req.userId=payload.subject
//   }catch(err){
//     return res.status(401).send('unauthorization request');
//   }
next()
  
 }
 
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'public/uploads')
  },
  filename: (req, file, callBack) => {
      callBack(null, `FunOfHeuristic_${file.originalname}`)
  }
})
const upload = multer({ storage: storage })

app.post('/file', upload.single('file'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
    res.json(file);
})
console.log(emmitter._events);
app.use('/',ConnectRoutes);
app.use('/',addPost);
app.use('/',addPost);
app.use('/',conversationRoutes);
app.use('/',userRouter);
app.use('/',linkRoutes);
app.use('/',addPostGroup);
app.use('/',commentRoutes);
app.use('/',groupRoutes);
app.use('/',notificationController);
app.use('/',upvoteRoutes);
app.use('/',userFeedRoutes);
app.use('/',coursRouter);
app.use('/',homeworkRouter);
app.use('/',homeworkResponseRouter);
app.use('/',backofficeRouter);

app.post("/sendEmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    res.send(info);
  });
});

async function sendMail(user, callback) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alatouatiii@gmail.com',
      pass: '260758aa'
    },  
    tls: {
      rejectUnauthorized: false
  }
  
  });

  let mailOptions = {
    from: '"Fun Of Heuristic"<example.gimail.com>',
    to: user.email, 
    subject: "Wellcome to Fun Of Heuristic 👻",
    html: `<h1>Hi ${user.firstName}
    <h4>Thanks for joining us</h4>`
  };

  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
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
          sockets[decoded.id] = socket.id
          console.log(users);
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
  
    function listener(data){
        console.log(emmitter.listenerCount('newNotif'));
        if(emmitter.listenerCount('newNotif')<=1){
          console.log(data);
          io.to(sockets[data.idOwner]).emit("notificationDetected",data)
          console.log("dead0");
        }else{
          emmitter.removeListener('newNotif',listener)
        };

    };
    
    emmitter.on('newNotif', listener)
    
    socket.on("answer", (id, message) => {
      console.log("answer",id);
      socket.to(id).emit("answer", socket.id, message);
    });
    socket.on("candidate", (id, message) => {
      socket.to(id).emit("candidate", socket.id, message);
    });

    function listener1(data){

      if(emmitter.listenerCount('newNotifvote')<=1){
        console.log("dead1");
        io.to(sockets[data.idOwner]).emit("notificationDetected",data)
      }else{
        emmitter.removeListener('newNotifvote',listener1)
      };

  };
  
  emmitter.on('newNotifvote', listener1)
  socket.on('newDisscu',(value)=>{
  conversation = value.message
  console.log("conversation",conversation);
  if(conversation._id){
    socket.join(conversation._id);
    let notification = {
      idUser : conversation.message.id,
      notification:{
        context:"sent a message"
      }
    }
    conversationServices.sendMessage(conversation).then(checkConv =>{
      console.log(checkConv,'checkConvcheckConvcheckConvcheckConv');
      notificationServices.createNotification(notification).then(
        ()=>{
          socket.broadcast.emit("Detected");
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
           idUser : conversation.message.id,
           notification:{
             context:"sent a message"
           }
         }
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
        // users = users.filter(u => u !== user);
        console.log('this is disconnected scoket rooms',socket.rooms)
      })
      io.emit('userOnline',{users})   
      socket.broadcast.emit('currentOnlineUser',{onlineUser})  
      socket.on( 'new_notification', function(data){
      console.log(data.title,data.message);
      io.sockets.emit( 'show_notification', { 
        title: data.title, 
        message: data.message, 
        icon: data.icon, 
      });
      });
  });
