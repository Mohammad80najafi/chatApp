import mongoose from "mongoose";

const uri =
  "mongodb+srv://mohammad0919najafi:Pn0XKGs1w8hf9MIu@cluster0.gznmy3p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongoDB = async () => {};
try {
  await mongoose.connect(uri);
  console.log("connect to mongo db");
} catch (error) {
  console.log("Error connecting to MongoDB", error.message);
}

export default connectToMongoDB;
