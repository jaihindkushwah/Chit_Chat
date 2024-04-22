
const express=require('express');
const app=express();
const chats=require("./data/data.js");
require("dotenv").config();

require("./config/db.js"); // db connection
const userRoutes=require("./routes/userRoutes.js");
const chatRoutes=require("./routes/chatRoutes.js");
app.use(express.json()); // to accept json data
const {errorHandler,notFound}=require("./middleware/errorMiddleware.js")
const messageRoutes=require("./routes/messageRoutes.js")

const path = require("path");


app.get("/api/chats",(req,res)=>{
    res.send(chats);
})
app.use("/api/user",userRoutes);
// chat api
app.use("/api/chat",chatRoutes)

app.use("/api/message",messageRoutes)


// -------------------Deployment----------------


const __dirname1=path.resolve();
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname1,"/frontend/build")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"frontend","build",'index.html'))
    })
}else{
    app.get("/",(req,res)=>{
        res.send("Welcome to express js");
    });
}


//--------------------Deployment-------------------


// middleware for error handling
app.use(notFound);
app.use(errorHandler);


const server=app.listen(process.env.PORT,console.log("Server started on port 5000"));

const io= require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000"
    }
})
io.on("connection",(socket)=>{
    console.log("connected to socket.io")
    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        // console.log("userId "+ userData._id);
        socket.emit("connected");
    })

    socket.on("join chat",(room)=>{
        socket.join(room);
        // console.log("user joined room " + room);
    })

    socket.on("typing",(room)=>socket.in(room).emit("typing"));
    socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"));

    socket.on("new message",(newMessageReceived)=>{
        var chat = newMessageReceived.chat;

        if(!chat.users) return console.log("chat.users not defined");
        chat.users.forEach((user)=>{
            if(user._id == newMessageReceived.sender._id){
                return;
            }
            socket.in(user._id).emit("message received", newMessageReceived)
        })
    })
    socket.off("setup",()=>{
        console.log("User disconnected");
        socket.leave(userData._id);
    })
})
