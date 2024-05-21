import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    description: "must be a string and is required",
  },
  password: {
    type: String,
    required: true,
    description: "must be a string and is required",
  },
  userId:{
    type: String,
    required: true,
    description: "must be a string and is required",
  }
});

const LoginModel = mongoose.model("Login", loginSchema, "logins");

export default LoginModel;
