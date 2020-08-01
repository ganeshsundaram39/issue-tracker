const express = require('express');
const router = express.Router();
const issueController = require("./../../app/controllers/issueController");
const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {

  let baseUrl = `${appConfig.apiVersion}/issues`;

  // defining routes.


  // params:  title, description
  app.post(`${baseUrl}/create`, issueController.createIssueFunction);

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

}
