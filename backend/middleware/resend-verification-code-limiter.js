const rateLimit = require("express-rate-limit")

const resendVerificationCodeLimiter = rateLimit({
  windows: 60 * 1000,
  max: 3,
  message: "Too many resend attempts from this IP, please try again after a minute."
})

module.exports = resendVerificationCodeLimiter