const mongoose = require("mongoose")
const shortid = require("shortid")
const time = require("./../libs/timeLib")
const passwordLib = require("./../libs/generatePasswordLib")
const response = require("./../libs/responseLib")
const logger = require("./../libs/loggerLib")
const validateInput = require("../libs/paramsValidationLib")
const check = require("../libs/checkLib")
const token = require("../libs/tokenLib")
const AuthModel = mongoose.model("Auth")

/* Models */
const UserModel = mongoose.model("User")

// start user signup function

let signUpFunction = (req, res) => {
  let validateUserInput = () => {
    return new Promise((resolve, reject) => {
      if (req.body.email) {
        if (!validateInput.Email(req.body.email)) {
          let apiResponse = response.generate(
            true,
            "Not a valid Email Address!",
            400,
            null
          )
          reject(apiResponse)
        } else if (check.isEmpty(req.body.password)) {
          let apiResponse = response.generate(
            true,
            '"password" parameter is missing"',
            400,
            null
          )
          reject(apiResponse)
        } else {
          resolve(req)
        }
      } else {
        logger.error(
          "Field Missing During User Creation",
          "userController: createUser()",
          5
        )
        let apiResponse = response.generate(
          true,
          "One or More Parameter(s) is missing",
          400,
          null
        )
        reject(apiResponse)
      }
    })
  } // end validate user input
  let createUser = () => {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ email: req.body.email }).exec(
        (err, retrievedUserDetails) => {
          if (err) {
            logger.error(err.message, "userController: createUser", 10)
            let apiResponse = response.generate(
              true,
              "Failed To Create User",
              500,
              null
            )
            reject(apiResponse)
          } else if (check.isEmpty(retrievedUserDetails)) {
            console.log(req.body)
            let newUser = new UserModel({
              userId: shortid.generate(),
              fullName: req.body.fullName,
              email: req.body.email.toLowerCase(),
              password: passwordLib.hashpassword(req.body.password),
              createdOn: time.now(),
            })
            newUser.save((err, newUser) => {
              if (err) {
                console.log(err)
                logger.error(err.message, "userController: createUser", 10)
                let apiResponse = response.generate(
                  true,
                  "Failed to create new User",
                  500,
                  null
                )
                reject(apiResponse)
              } else {
                let newUserObj = newUser.toObject()
                resolve(newUserObj)
              }
            })
          } else {
            logger.error(
              "User Cannot Be Created.User Already Present",
              "userController: createUser",
              4
            )
            let apiResponse = response.generate(
              true,
              "This email address is already taken ",
              403,
              null
            )
            reject(apiResponse)
          }
        }
      )
    })
  } // end create user function

  validateUserInput(req, res)
    .then(createUser)
    .then((resolve) => {
      delete resolve.password
      let apiResponse = response.generate(false, "User created", 200, resolve)
      res.send(apiResponse)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
} // end user signup function

// start of login function
let loginFunction = (req, res) => {
  let findUser = () => {
    console.log("findUser")
    return new Promise((resolve, reject) => {
      if (req.body.email) {
        console.log("req body email is there")
        console.log(req.body)
        UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
          /* handle the error here if the User is not found */
          if (err) {
            console.log(err)
            logger.error(
              "Failed To Retrieve User Data",
              "userController: findUser()",
              10
            )
            /* generate the error message and the api response message here */
            let apiResponse = response.generate(
              true,
              "Failed To Find User Details",
              500,
              null
            )
            reject(apiResponse)
            /* if Company Details is not found */
          } else if (check.isEmpty(userDetails)) {
            /* generate the response and the console error message here */
            logger.error("No User Found", "userController: findUser()", 7)
            let apiResponse = response.generate(
              true,
              "User not found!",
              404,
              null
            )
            reject(apiResponse)
          } else {
            /* prepare the message and the api response here */
            logger.info("User Found", "userController: findUser()", 10)
            resolve(userDetails)
          }
        })
      } else {
        let apiResponse = response.generate(
          true,
          "Email parameter is missing",
          400,
          null
        )
        reject(apiResponse)
      }
    })
  }
  let validatePassword = (retrievedUserDetails) => {
    console.log("validatePassword")
    return new Promise((resolve, reject) => {
      passwordLib.comparePassword(
        req.body.password,
        retrievedUserDetails.password,
        (err, isMatch) => {
          if (err) {
            console.log(err)
            logger.error(err.message, "userController: validatePassword()", 10)
            let apiResponse = response.generate(true, "Login Failed", 500, null)
            reject(apiResponse)
          } else if (isMatch) {
            let retrievedUserDetailsObj = retrievedUserDetails.toObject()
            delete retrievedUserDetailsObj.password
            delete retrievedUserDetailsObj._id
            delete retrievedUserDetailsObj.__v
            delete retrievedUserDetailsObj.createdOn
            delete retrievedUserDetailsObj.modifiedOn
            resolve(retrievedUserDetailsObj)
          } else {
            logger.info(
              "Login Failed Due To Invalid Password",
              "userController: validatePassword()",
              10
            )
            let apiResponse = response.generate(
              true,
              "Wrong Password. Login Failed",
              400,
              null
            )
            reject(apiResponse)
          }
        }
      )
    })
  }

  findUser(req, res)
    .then(validatePassword)
    .then(generateToken)
    .then(saveToken)
    .then((resolve) => {
      let apiResponse = response.generate(
        false,
        "Login Successful",
        200,
        resolve
      )
      res.status(200)
      res.send(apiResponse)
    })
    .catch((err) => {
      console.log("errorhandler")
      console.log(err)
      res.status(err.status)
      res.send(err)
    })
}

let generateToken = (userDetails) => {
  console.log("generate token")
  return new Promise((resolve, reject) => {
    token.generateToken(userDetails, (err, tokenDetails) => {
      if (err) {
        console.log(err)
        let apiResponse = response.generate(
          true,
          "Failed To Generate Token",
          500,
          null
        )
        reject(apiResponse)
      } else {
        tokenDetails.userId = userDetails.userId
        tokenDetails.userDetails = userDetails
        resolve(tokenDetails)
      }
    })
  })
}
let saveToken = (tokenDetails) => {
  console.log("save token")
  return new Promise((resolve, reject) => {
    AuthModel.findOne(
      { userId: tokenDetails.userId },
      (err, retrievedTokenDetails) => {
        if (err) {
          console.log(err.message, "userController: saveToken", 10)
          let apiResponse = response.generate(
            true,
            "Failed To Generate Token",
            500,
            null
          )
          reject(apiResponse)
        } else if (check.isEmpty(retrievedTokenDetails)) {
          let newAuthToken = new AuthModel({
            userId: tokenDetails.userId,
            authToken: tokenDetails.token,
            tokenSecret: tokenDetails.tokenSecret,
            tokenGenerationTime: time.now(),
          })
          newAuthToken.save((err, newTokenDetails) => {
            if (err) {
              console.log(err)
              logger.error(err.message, "userController: saveToken", 10)
              let apiResponse = response.generate(
                true,
                "Failed To Generate Token",
                500,
                null
              )
              reject(apiResponse)
            } else {
              let responseBody = {
                authToken: newTokenDetails.authToken,
                userDetails: tokenDetails.userDetails,
              }
              resolve(responseBody)
            }
          })
        } else {
          retrievedTokenDetails.authToken = tokenDetails.token
          retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
          retrievedTokenDetails.tokenGenerationTime = time.now()
          retrievedTokenDetails.save((err, newTokenDetails) => {
            if (err) {
              console.log(err)
              logger.error(err.message, "userController: saveToken", 10)
              let apiResponse = response.generate(
                true,
                "Failed To Generate Token",
                500,
                null
              )
              reject(apiResponse)
            } else {
              let responseBody = {
                authToken: newTokenDetails.authToken,
                userDetails: tokenDetails.userDetails,
              }
              resolve(responseBody)
            }
          })
        }
      }
    )
  })
}

let thirdPartyLoginFunction = (req, res) => {
  try {
    let userData = req.user._json

    var responseHTML =
      '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'

    let findUser = (userData) => {
      console.log("findUser")
      return new Promise((resolve, reject) => {
        if (userData && userData.email) {
          UserModel.findOne({ email: userData.email }, (err, userDetails) => {
            /* handle the error here if the User is not found */
            if (err) {
              console.log(err)
              logger.error(
                "Failed To Retrieve User Data",
                "userController: findUser()",
                10
              )
              /* generate the error message and the api response message here */
              let apiResponse = response.generate(
                true,
                "Email not found!",
                400,
                null
              )

              resolve(apiResponse)
              /* if Company Details is not found */
            } else if (check.isEmpty(userDetails)) {
              /* generate the response and the console error message here */
              logger.error("No User Found", "userController: findUser()", 7)
              let apiResponse = response.generate(
                true,
                "Email not found!",
                400,
                null
              )

              resolve(apiResponse)
            } else {
              /* prepare the message and the api response here */
              logger.info("User Found", "userController: findUser()", 10)
              let userObj = userDetails.toObject()
              delete userObj.password
              delete userObj._id
              delete userObj.__v
              delete userObj.createdOn
              delete userObj.modifiedOn
              resolve(response.generate(false, "Email Found!", 200, userObj))
            }
          })
        } else {
          let apiResponse = response.generate(
            true,
            "Email not found!",
            400,
            null
          )
          resolve(apiResponse)
        }
      })
    }

    let createUser = (resolved) => {
      return new Promise((resolve, reject) => {
        if (resolved && resolved.error) {
          console.log(userData)
          let newUser = new UserModel({
            userId: shortid.generate(),
            fullName: userData.name,
            email: userData.email
              ? userData.email.toLowerCase()
              : userData.name + shortid.generate(),
            googleLogin: req.url.includes("google") ? true : false,
            githubLogin: req.url.includes("github") ? true : false,
            twitterLogin: req.url.includes("twitter") ? true : false,
            facebookLogin: req.url.includes("facebook") ? true : false,

            password: passwordLib.hashpassword(userData.email + userData.name),
            createdOn: time.now(),
            picture:
              req.url.includes("twitter") && userData.profile_image_url_https
                ? userData.profile_image_url_https.replace("_normal", "")
                : req.url.includes("facebook") &&
                  userData.picture &&
                  userData.picture.data &&
                  userData.picture.data.url
                ? userData.picture.data.url
                : userData.picture
                ? userData.picture
                : "",
          })
          newUser.save((err, newUser) => {
            if (err) {
              console.log(err)
              logger.error(err.message, "userController: createUser", 10)
              let apiResponse = response.generate(
                true,
                "Failed to create new User",
                500,
                null
              )
              reject(apiResponse)
            } else {
              let newUserObj = newUser.toObject()
              delete newUserObj.password
              delete newUserObj._id
              delete newUserObj.__v
              delete newUserObj.createdOn
              delete newUserObj.modifiedOn
              resolve(newUserObj)
            }
          })
        } else {
          if (resolved && resolved.data) {
            delete resolved.data.googleLogin
            delete resolved.data.githubLogin
            delete resolved.data.twitterLogin
            delete resolved.data.facebookLogin

            resolve(resolved.data)
          } else {
            let apiResponse = response.generate(
              true,
              "Something went wrong!",
              400,
              null
            )

            responseHTML = responseHTML.replace(
              "%value%",
              JSON.stringify({
                apiResponse: apiResponse,
              })
            )
            res.status(apiResponse.status)
            res.send(responseHTML)
          }
        }
      })
    }

    findUser(userData)
      .then(createUser)
      .then(generateToken)
      .then(saveToken)
      .then((resolve) => {
        let apiResponse = response.generate(
          false,
          "Login Successful",
          200,
          resolve
        )
        responseHTML = responseHTML.replace(
          "%value%",
          JSON.stringify({
            apiResponse: apiResponse,
          })
        )
        res.status(apiResponse.status)
        res.send(responseHTML)
      })
      .catch((err) => {
        console.log("errorhandler")
        console.log(err)

        responseHTML = responseHTML.replace(
          "%value%",
          JSON.stringify({
            apiResponse: err,
          })
        )
        res.status(err.status)
        res.send(responseHTML)
      })
  } catch (err) {
    console.log({ err })
    let apiResponse = response.generate(true, "Something went wrong!", 400, err)
    responseHTML = responseHTML.replace(
      "%value%",
      JSON.stringify({
        apiResponse: apiResponse,
      })
    )
    res.status(apiResponse.status)
    res.send(responseHTML)
  }
}

// end of the login function

module.exports = {
  signUpFunction: signUpFunction,
  loginFunction: loginFunction,
  thirdPartyLoginFunction: thirdPartyLoginFunction,
} // end exports
