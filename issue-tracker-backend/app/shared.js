const path = require("path")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const routeLoggerMiddleware = require("./middlewares/routeLogger.js")
const globalErrorMiddleware = require("./middlewares/appErrorHandler")
const mongoose = require("mongoose")
const morgan = require("morgan")
const logger = require("./libs/loggerLib")
var session = require("express-session")
const express = require("express")
const helmet = require("helmet")
const MongoDBStore = require("connect-mongodb-session")(session)
var compression = require("compression")
var cloudinary = require("cloudinary").v2
const cors = require("cors")

exports.common = function (app, passport) {
  if (process.env.SERVER_ENV == "production") {
    // app.use(
    //   helmet({
    //     contentSecurityPolicy: {
    //       directives: {
    //         ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    //         "script-src": ["'self'", "'unsafe-inline'"],
    //         "img-src": ["'self'", "https:", "data:"],
    //       },
    //     },
    //   })
    // )

    app.use(compression())
  }
  app.use(cors())
  app.use(morgan("dev"))

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())

  app.use(routeLoggerMiddleware.logIp)
  app.use(globalErrorMiddleware.globalErrorHandler)

  app.use(express.static(path.join(__dirname, "../public")))
  app.use("/images", express.static(path.join("../public/images")))

  if (process.env.SERVER_ENV == "production") {
    const store = new MongoDBStore({
      uri: process.env.MONGODB_URI_USER,
      collection: "sessions",
    })

    app.set("trust proxy", 1) // trust first proxy
    app.use(
      session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        store: store,
      })
    )
  }

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize())
  app.use(passport.session())

  process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason)
  })

  mongoose.connection.on("error", function (err) {
    console.log("database connection error")
    console.log(err)
    logger.error(err, "mongoose connection on error handler", 10)
  })

  mongoose.connection.on("open", function (err) {
    if (err) {
      console.log("database error")
      console.log(err)
      logger.error(err, "mongoose connection open handler", 10)
    } else {
      console.log("database connection open success")
      logger.info(
        "database connection open",
        "database connection open handler",
        10
      )
    }
  })
}

exports.onListening = function (server) {
  var addr = server.address()
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
  "Listening on " + bind
  logger.info(
    "server listening on port" + addr.port,
    "serverOnListeningHandler",
    10
  )
  mongoose.connect(process.env.MONGODB_URI, {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

exports.onError = function (error) {
  if (error.syscall !== "listen") {
    logger.error(error.code + " not equal listen", "serverOnErrorHandler", 10)
    throw error
  }

  switch (error.code) {
    case "EACCES":
      logger.error(
        error.code + ":elavated privileges required",
        "serverOnErrorHandler",
        10
      )
      process.exit(1)
    case "EADDRINUSE":
      logger.error(
        error.code + ":port is already in use.",
        "serverOnErrorHandler",
        10
      )
      process.exit(1)
    default:
      logger.error(
        error.code + ":some unknown error occured",
        "serverOnErrorHandler",
        10
      )
      throw error
  }
}
