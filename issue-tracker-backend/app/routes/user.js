const userController = require("./../../app/controllers/userController")
const { authorizeMiddleware } = require("../middlewares/authorize")
const { singleUploadCtrl } = require("../middlewares/multer")

module.exports.setRouter = ({ app, passport }) => {
  let baseUrl = `${process.env.API_VERSION}/user`
  let baseUrlProfile = `${process.env.API_VERSION}/profile`

  app.post(`${baseUrl}/signup`, userController.signUpFunction)

  app.post(`${baseUrl}/login`, userController.loginFunction)

  app.get(
    `${baseUrl}/login/google`,
    passport.authenticate("google", { scope: ["profile", "email"] })
  )

  app.get(
    `${baseUrl}/login/google/callback`,
    passport.authenticate("google", { failureRedirect: "/auth/login" }),
    userController.thirdPartyLoginFunction
  )

  app.get(
    `${baseUrl}/login/github`,
    passport.authenticate("github", { scope: ["user:email"] })
  )

  app.get(
    `${baseUrl}/login/github/callback`,
    passport.authenticate("github", { failureRedirect: "/auth/login" }),

    userController.thirdPartyLoginFunction
  )

  app.get(
    `${baseUrl}/login/twitter`,
    passport.authenticate("twitter", { scope: ["user:email"] })
  )

  app.get(
    `${baseUrl}/login/twitter/callback`,
    passport.authenticate("twitter", { failureRedirect: "/auth/login" }),

    userController.thirdPartyLoginFunction
  )

  app.get(
    `${baseUrl}/login/facebook`,
    passport.authenticate("facebook", { scope: "email" })
  )

  app.get(
    `${baseUrl}/login/facebook/callback?`,
    passport.authenticate("facebook", { failureRedirect: "/auth/login" }),
    userController.thirdPartyLoginFunction
  )

  app.get(
    `${baseUrlProfile}`,
    authorizeMiddleware,
    userController.getUserInfoFunction
  )

  app.post(
    `${baseUrlProfile}/image-upload`,
    authorizeMiddleware,
    singleUploadCtrl,
    userController.uploadProfilePhotoFunction
  )
  app.post(
    `${baseUrlProfile}/update/basic`,
    authorizeMiddleware,
    userController.updateProfileBasicFunction
  )
  app.post(
    `${baseUrlProfile}/update/password`,
    authorizeMiddleware,
    userController.updateProfilePasswordFunction
  )
  app.post(
    `${baseUrlProfile}/update/theme`,
    authorizeMiddleware,
    userController.updateProfileThemeFunction
  )
  app.post(
    `${baseUrlProfile}/close-account`,
    authorizeMiddleware,
    userController.closeAccountFunction
  )
}
