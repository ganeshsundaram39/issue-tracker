const mongoose = require("mongoose")
const Schema = mongoose.Schema
const time = require("../libs/timeLib")

const Issue = new Schema({
  issueId: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imagePaths: {
    type: String,
  },
  issueGenerationTime: {
    type: Date,
    default: time.now(),
  },
})

mongoose.model("Issue", Issue)
