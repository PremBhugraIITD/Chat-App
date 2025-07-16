import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
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
app.use("/api/chat",chatRoutes);

app.use((err, req, res, next) => {
  console.log("Error occured");  
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
