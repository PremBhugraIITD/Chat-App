import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI,{
      dbName: "chat-app",
    });
    console.log(
      `MongoDB Connected successfully: ${connection.connection.db.databaseName}`
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;