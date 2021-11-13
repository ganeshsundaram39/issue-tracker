const mongoose = require("mongoose")
const Schema = mongoose.Schema
const time = require("../libs/timeLib")

const Issue = new Schema({
  issueId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  comments: [
    {
      comment: String,
      commentGenerationTime: {
        type: Date,
        default: time.now(),
      },
      commentId: String,
    },
  ],
  label: {
    type: String,
  },
  status: {
    type: String,
    default: "open",
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  issueGenerationTime: {
    type: Date,
    default: time.now(),
    required: true,
  },
})

mongoose.model("Issue", Issue)
