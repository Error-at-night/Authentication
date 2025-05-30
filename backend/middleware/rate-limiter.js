const rateLimit = require("express-rate-limit")
const { StatusCodes } = require("http-status-codes")

const registerRateLimter = rateLimit({
  windows: 10 * 60 * 1000,
  keyGenerator: (req) => req.body.email || req.ip,
  max: 3,
  message: "Too many register attempts, please try again after 10 minute.",
  handler: (req, res, next, options) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: options.message || "Too many requests",
    })
  },
})

const verifyEmailRateLimiter = rateLimit({
  windows: 10 * 60 * 1000,
  keyGenerator: (req) => req.body.email || req.ip,
  max: 5,
  message: "Too many incorrect verification attempts, Please try again in 10 minutes.",
  handler: (req, res, next, options) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: options.message || "Too many requests",
    })
  },
})

const resendVerificationCodeRateLimiter = rateLimit({
  windows: 60 * 1000,
  max: 3,
  keyGenerator: (req) => req.body.email || req.ip,
  message: "Too many resend verification code attempts, please try again after a minute.",
  handler: (req, res, next, options) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: options.message || "Too many requests",
    })
  },
})

const loginRateLimiter = rateLimit({
  windows: 10 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.body.email || req.ip,
  message: "Too many login attempts, please try again after 10 minute.",
  handler: (req, res, next, options) => {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: options.message || "Too many requests",
    })
  },
})

module.exports = {
  registerRateLimter,
  verifyEmailRateLimiter,
  resendVerificationCodeRateLimiter,
  loginRateLimiter
}