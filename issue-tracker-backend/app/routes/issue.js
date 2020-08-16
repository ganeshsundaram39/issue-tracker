const express = require("express")
const router = express.Router()
const issueController = require("./../../app/controllers/issueController")
const appConfig = require("./../../config/appConfig")
const multer = require("multer")

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

  // defining routes.

  // params:  title, description
  app.post(
    `${baseUrl}/create`,
    multer({ storage: storage }).array("images[]", 10),
    issueController.createIssueFunction
  )

  /**
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {post} /api/v1/issues/create api for creating new issue .
     *
     * @apiParam {string} title title of the issue. (body params) (required)
     * @apiParam {string} description description of the issue. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     *
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Issue created Successfully",
            "status": 200,
            "data": {
                "issueDetails": {
                "description": "User not able to login.",
                "title": "Login page not functional",
                "issueId": "E9zxTYA8"
            }

        }
    */

  app.post(
    `${baseUrl}/get`,
    issueController.getIssuesFunction
  )

  /**
   * @apiGroup issues
   * @apiVersion  1.0.0
   * @api {post} /api/v1/issues/get api for getting all issues.
   *
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   *
   * @apiSuccessExample {object} Success-Response:
       {
          "error": false,
          "message": "Issue retrieved successfully",
          "status": 200,
          "data": [ {
              "description": "User not able to login.",
              "title": "Login page not functional",
              "issueId": "E9zxTYA8"
              }
            ]
        }
  */
}
