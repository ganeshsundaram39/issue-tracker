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
          console.log({ newBoardObj })
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
          ...(req.query.boardId || req.body.boardId ? {} : { lanes: 0 }),
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

const updateLanesFunction = (req, res) => {
  const updateLanes = () => {
    return new Promise((resolve, reject) => {
      if (!req.body.boardId || !req.body.userId) {
        let apiResponse = response.generate(
          true,
          "Failed to update lanes",
          500,
          err
        )
        reject(apiResponse)
      }
      BoardModel.findOneAndUpdate(
        { boardId: req.body.boardId, userId: req.body.userId },
        {
          $set: {
            lanes: req.body.lanes,
            boardGenerationTime: new Date(),
          },
        },
        (error, success) => {
          if (error) {
            console.log(error)
            logger.error(
              err.message,
              "boardController: updateLanesFunction",
              10
            )
            let apiResponse = response.generate(
              true,
              "Failed to update Lanes",
              500,
              err
            )
            reject(apiResponse)
          } else {
            console.log(success)
            resolve(req, res)
          }
        }
      )
    })
  }

  updateLanes()
    .then(() => getBoardsFunction(req, res))
    .catch((err) => {
      console.log({ err })
      res.status(err.status)
      res.send(err)
    })
}

const editBoardFunction = (req, res) => {
  const editBoard = () => {
    return new Promise((resolve, reject) => {
      if (!req.body.boardId || !req.body.userId) {
        let apiResponse = response.generate(
          true,
          "Failed to edit board",
          500,
          err
        )
        reject(apiResponse)
      }
      BoardModel.findOneAndUpdate(
        { boardId: req.body.boardId, userId: req.body.userId },
        {
          $set: {
            title: req.body.title,
            boardBackgroundImg: req.body.boardBackgroundImg,
            boardGenerationTime: new Date(),
          },
        },
        (error, success) => {
          if (error) {
            console.log(error)
            logger.error(err.message, "boardController: editBoardFunction", 10)
            let apiResponse = response.generate(
              true,
              "Failed to edit board",
              500,
              err
            )
            reject(apiResponse)
          } else {
            console.log(success)
            resolve(req, res)
          }
        }
      )
    })
  }

  editBoard()
    .then(() => getBoardsFunction(req, res))
    .catch((err) => {
      console.log({ err })
      res.status(err.status)
      res.send(err)
    })
}

const deleteBoardFunction = async (req, res) => {
  try {
    if (!req.body.boardId) {
      throw new Error("boardId cannot be invalid!")
    }

    if (!req.body.userId) {
      throw new Error("userId cannot be invalid!")
    }

    await BoardModel.deleteOne({
      boardId: req.body.boardId,
      userId: req.body.userId,
    }).lean()

    let apiResponse = response.generate(
      false,
      "Board Deleted Successfully!",
      200,
      true
    )
    return res.json(apiResponse)
  } catch (e) {
    console.log({ e })
    let apiResponse = response.generate(true, "Failed to delete board!", 422, e)
    return res.status(422).send(apiResponse)
  }
}

module.exports = {
  createBoardFunction,
  getBoardsFunction,
  updateLanesFunction,
  editBoardFunction,
  deleteBoardFunction,
} // end exports
