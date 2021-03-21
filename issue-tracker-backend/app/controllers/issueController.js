const mongoose = require("mongoose")
const shortid = require("shortid")
const response = require("./../libs/responseLib")
const logger = require("./../libs/loggerLib")
const path = require("path")
const DatauriParser = require("datauri/parser")
const parser = new DatauriParser()
const IssueModel = mongoose.model("Issue")
var cloudinary = require("cloudinary").v2
const moment = require("moment")

const createIssueFunction = (req, res) => {
  const createIssue = () => {
    return new Promise((resolve, reject) => {
      let newIssue = new IssueModel({
        issueId: shortid.generate(),
        title: req.body.title,
        comments: req.body.comment
          ? [{ comment: req.body.comment, commentId: shortid.generate() }]
          : [],
        label: req.body.label,
        userId: req.body.userId,
      })
      newIssue.save((err, newIssue) => {
        if (err) {
          logger.error(err.message, "issueController: createIssue", 10)
          let apiResponse = response.generate(
            true,
            "Failed to create new Issue",
            500,
            null
          )
          reject(apiResponse)
        } else {
          let newIssueObj = newIssue.toObject()
          resolve(newIssueObj)
        }
      })
    })
  }

  createIssue()
    .then((result) => {
      // console.log({ result })
      let apiResponse = response.generate(false, "Issue created", 200, result)
      res.send(apiResponse)
    })
    .catch((err) => {
      console.log({ err })
      res.status(err.status)
      res.send(err)
    })
} // end user signup function

const getIssuesFunction = (req, res) => {
  const getIssues = () => {
    return new Promise((resolve, reject) => {
      IssueModel.find(
        {
          ...(req.query.userId || req.body.userId
            ? { userId: req.query.userId || req.body.userId }
            : {}),

          ...(req.query.issueId || req.body.issueId
            ? { issueId: req.query.issueId || req.body.issueId }
            : {}),

          ...(req.query.search
            ? { title: { $regex: req.query.search, $options: "i" } }
            : {}),
        },
        {
          __v: 0,
          _id: 0,
        }
      )
        .sort({ issueGenerationTime: -1 })
        .lean()
        .exec((err, allIssues) => {
          if (err) {
            logger.error(err.message, "issueController: getIssues", 10)
            let apiResponse = response.generate(
              true,
              "Failed to get all Issues",
              500,
              err
            )
            reject(apiResponse)
          } else {
            resolve(allIssues)
          }
        })
    })
  }
  getIssues()
    .then((results) => {
      // console.log({ results })
      results = results.map((result) => ({
        ...result,
        issueGenerationTime: moment(result.issueGenerationTime).fromNow(),
        ...(result.comments
          ? {
              comments: [
                ...result.comments.map((comment) => ({
                  ...comment,
                  commentGenerationTime: moment(
                    comment.commentGenerationTime
                  ).fromNow(),
                })),
              ],
            }
          : {}),
      }))
      let apiResponse = response.generate(
        false,
        "Issues retrieved successfully.",
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

const updateCommentsFunction = (req, res) => {
  const updateComments = () => {
    return new Promise((resolve, reject) => {
      if (!req.body.issueId || !req.body.userId) {
        let apiResponse = response.generate(
          true,
          "Failed to update comments",
          500,
          err
        )
        reject(apiResponse)
      }
      IssueModel.findOneAndUpdate(
        { issueId: req.body.issueId, userId: req.body.userId },
        {
          $push: {
            comments: {
              comment: req.body.comment,
              commentId: shortid.generate(),
              commentGenerationTime: new Date(),
            },
          },
        },
        (error, success) => {
          if (error) {
            console.log(error)
            logger.error(
              err.message,
              "issueController: updateCommentsFunction",
              10
            )
            let apiResponse = response.generate(
              true,
              "Failed to update comments",
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

  updateComments()
    .then(() => getIssuesFunction(req, res))
    .catch((err) => {
      console.log({ err })
      res.status(err.status)
      res.send(err)
    })
}

const updateIssueStatusFunction = (req, res) => {
  const updateStatus = () => {
    return new Promise((resolve, reject) => {
      if (!req.body.issueId || !req.body.userId) {
        let apiResponse = response.generate(
          true,
          "Failed to update status",
          500,
          err
        )
        reject(apiResponse)
      }
      IssueModel.findOneAndUpdate(
        { issueId: req.body.issueId, userId: req.body.userId },
        {
          $set: {
            status: req.body.status,
            issueGenerationTime: new Date(),
          },
        },
        (error, success) => {
          if (error) {
            console.log(error)
            logger.error(
              err.message,
              "issueController: updateIssueStatusFunction",
              10
            )
            let apiResponse = response.generate(
              true,
              "Failed to update status",
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

  updateStatus()
    .then(() => getIssuesFunction(req, res))
    .catch((err) => {
      console.log({ err })
      res.status(err.status)
      res.send(err)
    })
}

const formatBufferTo64 = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer)

const cloudinaryUpload = (file) =>
  cloudinary.uploader.upload(file, {
    eager: [{ width: 500, height: 500, crop: "pad" }],
  })

const createIssueSaveImageFunction = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Image is not presented!")
    }
    const file64 = formatBufferTo64(req.file)
    const uploadResult = await cloudinaryUpload(file64.content)
    // console.log({ uploadResult })
    return res.json({
      cloudinaryId: uploadResult.public_id,
      url: uploadResult.eager[0].secure_url,
      error: false,
    })
  } catch (e) {
    return res.status(422).send({ message: e.message, error: true })
  }
}

const destroyImages = async (req, res) => {
  try {
    const images = req.body.images
    if (!images || images.length == 0) {
      throw new Error("No Images found for destruction!")
    }
    images.forEach(async (image) => {
      console.log(image)
      const result = await cloudinary.uploader.destroy(image)
      console.log(result)
    })

    return res.json({
      result: "Images Destroyed",
    })
  } catch (e) {
    return res.status(422).send({ message: e.message, error: true })
  }
}

module.exports = {
  createIssueFunction,
  getIssuesFunction,
  createIssueSaveImageFunction,
  destroyImages,
  updateCommentsFunction,
  updateIssueStatusFunction,
} // end exports
