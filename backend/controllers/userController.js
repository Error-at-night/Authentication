// const User = require("../models/User")

const { StatusCodes } = require("http-status-codes")

const showCurrentUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Authentication invalid" })
    }
    res.status(StatusCodes.OK).json({ user: req.user })
  } catch(error) {
    next(error)
  }
}

module.exports = {
  showCurrentUser
}