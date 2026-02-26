import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async() => {
  try {
    const connnectionInstance = await mongoose.connect(`${env.mongodbUri}/${env.dbName}`,{
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout 
    })
    console.log(`\n ✅ MongoDB connected !! DB HOST: ${connnectionInstance.connection.host}`)
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    console.log(" MongoDB connection FAILED!!", error);
    process.exit(1);
  }
}

// shutdown
mongoose.connection.on('disconnected', () => {
  console.warn("⚠️ MongoDB disconnected")
})

