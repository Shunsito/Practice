import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.URI, {
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
