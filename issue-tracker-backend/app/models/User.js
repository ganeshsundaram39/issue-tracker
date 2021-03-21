const mongoose = require("mongoose"),
  Schema = mongoose.Schema

let userSchema = new Schema({
  userId: {
    type: String,
    default: "",
    index: true,
    unique: true,
    required: true,
  },
  fullName: {
    type: String,
    default: "",
    required: true,
  },
  email: {
    type: String,
    default: "",
    required: true,
  },
  password: {
    type: String,
    default: "lasd;lfkjlkfda",
    required: true,
  },
  createdOn: {
    type: Date,
    default: "",
    required: true,
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
  githubProfile: {
    type: String,
  },
  twitterProfile: {
    type: String,
  },
  facebookProfile: {
    type: String,
  },
  redditProfile: {
    type: String,
  },
  bio: {
    type: String,
  },
  picture: {
    type: String,
    default: "https://api.hello-avatar.com/adorables/dasdf",
  },
  cloudinaryId: {
    type: String,
  },
  theme: {
    primaryColorName: {
      type: String,
      default: "indigo",
    },
    primaryColorHash: {
      type: String,
      default: "#3f51b5",
    },
  },
})

mongoose.model("User", userSchema)
