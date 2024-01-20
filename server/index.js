import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { postApiSignup, postApiLogin } from "./controllers/user.js";
import { Server } from "socket.io";
dotenv.config();

const app = express();
app.use(express.json());

const io = new Server(5005, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (data) => {
    console.log(data);
  });
});

app.get("/sendMessage", (req, res) => {
  const { message } = req.query;
  io.emit("receive", message);

  res.status(200).json({ message: "Message send" });
});

async function connectMongoDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
      console.log("Connected to MongoDB📦");
    }
  } catch (e) {
    console.log(e.message);
  }
}
connectMongoDB();

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "running app successfully..",
  });
});

app.post("/api/signup", postApiSignup);

app.post("/api/login", postApiLogin);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
