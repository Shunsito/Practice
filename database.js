import mongoose from "mongoose";

const URI = "mongodb://localhost/practicaDB";

const connectDB = async () => {
  try {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
