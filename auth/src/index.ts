import mongoose, { Collection } from "mongoose";
import { app } from "./app";

const PORT = 3000;

const start = async () => {
  console.log('Github starting!')
  
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Generic settings
      useUnifiedTopology: true, // Generic settings
      useCreateIndex: true, // Generic settings
    }); // Cluster IP and database at the end / and Mongoose will create it if not existing
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

app.listen(PORT, () => {
  console.log(`Active on PORT: ${PORT}`);
});

// Run DB
start();
