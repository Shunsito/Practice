import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    requiered: true,
    trim: true,
  },
  lastname: {
    type: String,
    requiered: true,
    trim: true,
  },
  email: {
    type: String,
    requiered: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    requiered: true,
    trim: true,
  },
});

export default mongoose.model("User", UserSchema);
