const mongoose = require("mongoose")
const shortid = require("shortid")
const response = require("./../libs/responseLib")
const logger = require("./../libs/loggerLib")

/* Models */
const IssueModel = mongoose.model("Issue")

// start user signup function

const createIssueFunction = (req, res) => {

  const createIssue = () => {
    return new Promise((resolve, reject) => {
      const url = req.protocol + "://" + req.get("host")
      let newIssue = new IssueModel({
        issueId: shortid.generate(),
        title: req.body.title,
        description: req.body.description,
        imagePaths:
          req.files && req.files.length
            ? req.files.map((f) => `${url}/images/${f.filename}`).join(",")
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
      IssueModel.find((err, allIssues) => {
        if (err) {
          logger.error(err.message, "issueController: getIssues", 10)
          let apiResponse = response.generate(
            true,
            "Failed to get all Issues",
            500,
            null
          )
          reject(apiResponse)
        } else {
          let allIssuesObj = allIssues.toObject()
          resolve(allIssuesObj)
        }
      })
    });
  }
  getIssues().then(result => {
    console.log({ result })
    let apiResponse = response.generate(false, "Issues retrieved successfully.", 200, result)
    res.send(apiResponse)
  }).catch(err => {
    console.log({ err });
    res.status(err.status)
    res.send(err)
  })

}


module.exports = {
  createIssueFunction,
  getIssuesFunction
} // end exports
