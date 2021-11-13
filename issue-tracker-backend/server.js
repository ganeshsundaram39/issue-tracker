const express = require("express")
const fs = require("fs")
const path = require("path")
const http = require("http")
var passport = require("passport")

require("./app/middlewares/passport")(passport)

const app = express()

const globalErrorMiddleware = require("./app/middlewares/appErrorHandler")
const { common, onError, onListening } = require("./app/shared.js")

const modelsPath = "./app/models"
const routesPath = "./app/routes"

common(app, passport)

fs.readdirSync(modelsPath).forEach(function (file) {
  if (~file.indexOf(".js")) require(modelsPath + "/" + file)
})

fs.readdirSync(routesPath).forEach(function (file) {
  if (~file.indexOf(".js")) {
    let route = require(routesPath + "/" + file)
    route.setRouter({ app, passport })
  }
})

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../issue-tracker-frontend/build"))
  )

  app.get("/*", function (req, res) {
    res.sendFile(
      path.join(__dirname, "../issue-tracker-frontend/build", "index.html")
    )
  })
}

app.use(globalErrorMiddleware.globalNotFoundHandler)

const server = http.createServer(app)

server.listen(process.env.PORT || process.env.SERVER_PORT)
server.on("error", onError)
server.on("listening", onListening.bind(this, server))

module.exports = app
