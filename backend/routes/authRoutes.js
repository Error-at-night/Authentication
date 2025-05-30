const express = require("express")
const router = express.Router()

const { register, login, verifyEmail, resendVerificationCode, } = require("../controllers/authController")

const { resendVerificationCodeRateLimiter, registerRateLimter, verifyEmailRateLimiter, loginRateLimiter } = require("../middleware/rateLimiter")

router.post("/register", registerRateLimter, register)
router.post("/verify-email", verifyEmailRateLimiter, verifyEmail)
router.post("/resend-verification-code", resendVerificationCodeRateLimiter, resendVerificationCode)
router.post("/login", loginRateLimiter, login)

module.exports = router