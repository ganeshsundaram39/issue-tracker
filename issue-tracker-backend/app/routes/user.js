const express = require("express")
const router = express.Router()
const userController = require("./../../app/controllers/userController")


module.exports.setRouter = (app) => {
  let baseUrl = `${process.env.API_VERSION}/users`

  app.post(`${baseUrl}/signup`, userController.signUpFunction)

  app.post(`${baseUrl}/login`, userController.loginFunction)
  app.post(`${baseUrl}/login/google`, userController.googleLoginFunction)

}
