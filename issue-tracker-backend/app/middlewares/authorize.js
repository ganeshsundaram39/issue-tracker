const response = require("../libs/responseLib")
const tokenLib = require("../libs/tokenLib")

let authorizeMiddleware = (req, res, next) => {
  console.log("authorizeMiddleware")

  try {
    const token = req.headers.authorization
    tokenLib.verifyToken(token, (err, decoded) => {
      if (err) {
        return errorResponse({ res, err })
      } else {
        next()
      }
    })
  } catch (err) {
    return errorResponse({ res, err })
  }
}

const errorResponse = ({ res, err }) =>
  res.status(401).json(response.generate(true, "Not Authorized", 401, err))

module.exports = {
  authorizeMiddleware: authorizeMiddleware,
}
