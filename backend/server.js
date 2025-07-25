import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use((err, req, res, next) => {
  console.log("Error occured");
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
});

const server = app.listen(
  PORT,
  console.log(`Server is running on port ${PORT}`)
);

import { Server } from "socket.io";

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join("room");
    console.log("User joined room:", room);
  });
  socket.on("typing", (room) => {
    console.log("User is typing in room:", room._id);
    room.users.forEach((user) => {
      socket.in(user._id).emit("typing");
    });
  });
  socket.on("stop typing", (room) => {
    console.log("User stopped typing in room:", room._id);
    room.users.forEach((user) => {
      socket.in(user._id).emit("stop typing");
    });
  });
  socket.on("new message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;
    if (!chat.users) {
      return console.log("No users present in chat");
    }
    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) {
        return;
      } else {
        socket.in(user._id).emit("message received", newMessageReceived);
        // console.log("Message sent to user:", user._id);
      }
    });
  });
  socket.off("setup", () => {
    console.log("User disconnected");
    socket.leave(userData._id);
  });
});
