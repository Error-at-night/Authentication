const CustomError = require("../errors")
const { StatusCodes } = require("http-status-codes")

const showCurrentUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new CustomError.UnauthenticatedError("Authentication invalid")
    }
    res.status(StatusCodes.OK).json({ user: req.user })
  } catch(error) {
    next(error)
  }
}

module.exports = {
  showCurrentUser
}