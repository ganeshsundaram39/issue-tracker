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
})

mongoose.model("User", userSchema)
