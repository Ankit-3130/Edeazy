const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const mongoose=require("mongoose");
const connecttodb=require("./mongo");

connecttodb();

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//routes
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/chat',require("./Routes/chat"));
app.use('/api/message',require("./Routes/msg"));
app.use('/api/group',require('./Routes/group'));
app.use('/assignment',require('./Routes/assign'));
app.use('/notif',require('./Routes/notif'));
const server=app.listen(3001,()=>{
    console.log("successfully connected to port 3001 ");
})
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
   
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chatref;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        console.log(user._id);
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });

