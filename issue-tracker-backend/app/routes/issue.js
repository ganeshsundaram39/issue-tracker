const express = require("express")
const router = express.Router()
const issueController = require("./../../app/controllers/issueController")
const appConfig = require("./../../config/appConfig")
const multer = require("multer")
const { authorizeMiddleware } = require("../middlewares/authorize")

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype]
    let error = new Error("Invalid mime type")
    if (isValid) {
      error = null
    }
    cb(error, "public/images")
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-")
    cb(null, name)
  },
})

module.exports.setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}/issues`



  app.post(
    `${baseUrl}/create`,
    authorizeMiddleware,
    multer({ storage: storage }).array("images[]", 10),
    issueController.createIssueFunction
  )

  app.get(
    `${baseUrl}`,
    authorizeMiddleware,
    issueController.getIssuesFunction
  )


}
