const rateLimit = require("express-rate-limit")
const { StatusCodes } = require("http-status-codes")

const registerRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  keyGenerator: (req) => req.body.email || req.ip,
  max: 3,
  message: "Too many attempts, please wait before trying again",
  handler: (req, res, next, options) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: options.message || "Too many requests, please try again later",
    })
  }
})

const verifyEmailRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  keyGenerator: (req) => req.body.email || req.ip,
  max: 3,
  message: "Too many attempts, please wait before trying again",
  handler: (req, res, next, options) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: options.message || "Too many requests, please try again later",
    })
  }
})

const resendVerificationCodeRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  keyGenerator: (req) => req.body.email || req.ip,
  message: "Too many attempts, please wait before trying again",
  handler: (req, res, next, options) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: options.message || "Too many requests, please try again later",
    })
  }
})

const loginRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.body.email || req.ip,
  message: "Too many attempts, please wait before trying again",
  handler: (req, res, next, options) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: options.message || "Too many requests, please try again later",
    })
  }
})

const forgotPasswordRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  keyGenerator: (req) => req.body.email || req.ip,
  message: "Too many attempts, please wait before trying again",
  handler: (req, res, next, options) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: options.message || "Too many requests, please try again later",
    })
  }
})

const resetPasswordRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  keyGenerator: (req) => req.body.email || req.ip,
  message: "Too many attempts, please wait before trying again",
  handler: (req, res, next, options) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: options.message || "Too many requests, please try again later",
    })
  }
})

module.exports = {
  registerRateLimit,
  verifyEmailRateLimit,
  resendVerificationCodeRateLimit,
  loginRateLimit,
  forgotPasswordRateLimit,
  resetPasswordRateLimit
}