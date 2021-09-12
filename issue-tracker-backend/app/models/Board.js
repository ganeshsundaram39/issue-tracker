const mongoose = require("mongoose")
const Schema = mongoose.Schema
const time = require("../libs/timeLib")

const Board = new Schema({
  boardId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  boardBackgroundImg: {
    type: String,
    default: "default",
  },
  userId: {
    type: String,
    required: true,
  },
  boardGenerationTime: {
    type: Date,
    default: time.now(),
    required: true,
  },
  lanes: [
    {
      id: String,
      title: String,
      style: {
        type:Object,
        default:{
          width:280
        }
      },
      cards: [
        {
          id: String,
          title: String,
          description: String
        }
      ]
    }
  ],
})

mongoose.model("Board", Board)
