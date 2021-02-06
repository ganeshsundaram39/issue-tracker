const mongoose = require("mongoose")
const shortid = require("shortid")
const response = require("./../libs/responseLib")
const logger = require("./../libs/loggerLib")
const path = require('path');
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
/* Models */
const IssueModel = mongoose.model("Issue")
var cloudinary = require('cloudinary').v2;
// start user signup function

const formatBufferTo64 = file =>
  parser.format(path.extname(file.originalname).toString(), file.buffer)


const createIssueFunction = (req, res) => {
  const createIssue = () => {
    return new Promise((resolve, reject) => {
      let newIssue = new IssueModel({
        issueId: shortid.generate(),
        title: req.body.title,
        description: req.body.description,
        imagePaths:
          req.imageUrls && req.imageUrls.length
            ? req.imageUrls
            : "",
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
      console.log({ result })
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
      IssueModel.find({}, { __v: 0, _id: 0 })
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
    .then((result) => {
      console.log({ result })
      let apiResponse = response.generate(
        false,
        "Issues retrieved successfully.",
        200,
        result
      )
      res.send(apiResponse)
    })
    .catch((err) => {
      console.log({ err })
      res.status(err.status)
      res.send(err)
    })
}


const createIssueSaveImageFunction = async(req,res)=>{
  try {
    if (!req.file) { throw new Error('Image is not presented!'); }
    const file64 = formatBufferTo64(req.file);
    const uploadResult = await cloudinaryUpload(file64.content);

    return res.json({cloudinaryId: uploadResult.public_id, url: uploadResult.secure_url});
  } catch(e) {
    return res.status(422).send({message: e.message})
  }

  // cloudinary.v2.uploader.upload("/home/my_image.jpg",
  // function(error, result) {console.log(result, error)});
}

module.exports = {
  createIssueFunction,
  getIssuesFunction,
  createIssueSaveImageFunction,
} // end exports
