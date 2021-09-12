const mongoose = require("mongoose")
const shortid = require("shortid")
const response = require("./../libs/responseLib")
const logger = require("./../libs/loggerLib")
const BoardModel = mongoose.model("Board")
const moment = require("moment")
const { initialLanes } = require("./initialLanes")
const createBoardFunction = (req, res) => {
  const createBoard = () => {
    return new Promise((resolve, reject) => {
      let newBoard = new BoardModel({
        boardId: shortid.generate(),
        title: req.body.title,
        boardBackgroundImg: req.body.boardBackgroundImg,
        userId: req.body.userId,
        lanes: initialLanes,
      })
      newBoard.save((err, newBoard) => {
        if (err) {
          logger.error(err.message, "boardController: createBoard", 10)
          let apiResponse = response.generate(
            true,
            "Failed to create new Board",
            500,
            null
          )
          reject(apiResponse)
        } else {
          let newBoardObj = newBoard.toObject()
          resolve(newBoardObj)
        }
      })
    })
  }

  createBoard()
    .then((result) => {
      // console.log({ result })
      let apiResponse = response.generate(false, "Board created", 200, result)
      res.send(apiResponse)
    })
    .catch((err) => {
      console.log({ err })
      res.status(err.status)
      res.send(err)
    })
} // end user signup function

const getBoardsFunction = (req, res) => {
  const getBoards = () => {
    return new Promise((resolve, reject) => {
      BoardModel.find(
        {
          ...(req.query.userId || req.body.userId
            ? { userId: req.query.userId || req.body.userId }
            : {}),

          ...(req.query.boardId || req.body.boardId
            ? { boardId: req.query.boardId || req.body.boardId }
            : {}),

          ...(req.query.search
            ? { title: { $regex: req.query.search, $options: "i" } }
            : {}),
        },
        {
          __v: 0,
          _id: 0,
          ...(req.query.boardId ?{}:{lanes:0})
        }
      )
        .sort({ boardGenerationTime: -1 })
        .lean()
        .exec((err, allBoards) => {
          if (err) {
            logger.error(err.message, "boardController: getBoards", 10)
            let apiResponse = response.generate(
              true,
              "Failed to get all Boards",
              500,
              err
            )
            reject(apiResponse)
          } else {
            resolve(allBoards)
          }
        })
    })
  }
  getBoards()
    .then((results) => {
      // console.log({ results })
      results = results.map((result) => ({
        ...result,
        boardGenerationTime: moment(result.boardGenerationTime).fromNow(),
      }))
      let apiResponse = response.generate(
        false,
        "Boards retrieved successfully.",
        200,
        results
      )
      res.send(apiResponse)
    })
    .catch((err) => {
      console.log({ err })
      res.status(err.status)
      res.send(err)
    })
}

module.exports = {
  createBoardFunction,
  getBoardsFunction,
} // end exports
