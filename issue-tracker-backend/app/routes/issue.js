const issueController = require("./../../app/controllers/issueController")

const { authorizeMiddleware } = require("../middlewares/authorize")
const { singleUploadCtrl } = require("../middlewares/multer")


module.exports.setRouter = ({app}) => {
  let baseUrl = `${process.env.API_VERSION}/issues`

  app.post(
    `${baseUrl}/create`,
    authorizeMiddleware,
    issueController.createIssueFunction
  )

  app.get(`${baseUrl}`, authorizeMiddleware, issueController.getIssuesFunction)

  app.post(
    `${baseUrl}/create/image-upload`,
    authorizeMiddleware,
    singleUploadCtrl,
    issueController.createIssueSaveImageFunction
  )

  app.post(
    `${baseUrl}/create/image-destroy`,
    authorizeMiddleware,
    issueController.destroyImages
  )

  app.post(
    `${baseUrl}/comments`,
    authorizeMiddleware,
    issueController.updateCommentsFunction
  )

  app.post(
    `${baseUrl}/update-status`,
    authorizeMiddleware,
    issueController.updateIssueStatusFunction
  )
}
