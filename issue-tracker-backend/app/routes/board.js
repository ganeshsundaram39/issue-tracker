const boardController = require("./../../app/controllers/boardController")

const { authorizeMiddleware } = require("../middlewares/authorize")

module.exports.setRouter = ({ app }) => {
  let baseUrl = `${process.env.API_VERSION}/boards`

  app.post(
    `${baseUrl}/create`,
    authorizeMiddleware,
    boardController.createBoardFunction
  )

  app.get(`${baseUrl}`, authorizeMiddleware, boardController.getBoardsFunction)

  app.post(`${baseUrl}/edit`, authorizeMiddleware, boardController.editBoardFunction)

  app.post(`${baseUrl}/update-board-lanes`, authorizeMiddleware, boardController.updateLanesFunction)

  app.post(`${baseUrl}/delete/board`, authorizeMiddleware, boardController.deleteBoardFunction)

}
