const rateLimit = require("express-rate-limit")
const { StatusCodes } = require("http-status-codes")

const registerRateLimit = rateLimit({
  windows: 10 * 60 * 1000,
  keyGenerator: (req) => req.body.email || req.ip,
  max: 3,
  message: "Too many requests, please try again later",
  handler: (req, res, next, options) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: options.message || "Too many requests, please try again later",
    })
  },
})

const verifyEmailRateLimit = rateLimit({
  windows: 10 * 60 * 1000,
  keyGenerator: (req) => req.body.email || req.ip,
  max: 5,
  message: "Too many requests. Please try again later",
  handler: (req, res, next, options) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: options.message || "Too many requests, please try again later",
    })
  },
})

const resendVerificationCodeRateLimit = rateLimit({
  windows: 60 * 1000,
  max: 3,
  keyGenerator: (req) => req.body.email || req.ip,
  message: "Too many requests, please try again later",
  handler: (req, res, next, options) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: options.message || "Too many requests, please try again later",
    })
  },
})

const loginRateLimit = rateLimit({
  windows: 10 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.body.email || req.ip,
  message: "Too many requests, please try again later",
  handler: (req, res, next, options) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: options.message || "Too many requests, please try again later",
    })
  },
})

module.exports = {
  registerRateLimit,
  verifyEmailRateLimit,
  resendVerificationCodeRateLimit,
  loginRateLimit
}