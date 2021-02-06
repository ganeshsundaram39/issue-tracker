"use strict"
/**
 * Module Dependencies
 */
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
    default: "lasd;lfkjlk",
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
  picture: {
    type: String,
    default: "",
  },
})

mongoose.model("User", userSchema)
