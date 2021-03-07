const mongoose = require("mongoose"),
  Schema = mongoose.Schema

let userSchema = new Schema({
  userId: {
    type: String,
    default: "",
    index: true,
    unique: true,
  },
  fullName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "lasd;lfkjlkfda",
  },
  createdOn: {
    type: Date,
    default: "",
  },
  googleLogin: {
    type: Boolean,
    default: false,
  },
  githubLogin: {
    type: Boolean,
    default: false,
  },
  twitterLogin: {
    type: Boolean,
    default: false,
  },
  facebookLogin: {
    type: Boolean,
    default: false,
  },
  githubProfile:{
    type: String
  },
  twitterProfile:{
    type: String
  },
  facebookProfile:{
    type: String
  },
  picture: {
    type: String,
    default: "https://api.hello-avatar.com/adorables/dasdf",
  },
})

mongoose.model("User", userSchema)
