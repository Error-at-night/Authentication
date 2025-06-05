const express = require("express")
const router = express.Router()

const { register, login, verifyEmail, resendVerificationCode, logout, forgotPassword, resetPassword, } = require("../controllers/authController")
const { resendVerificationCodeRateLimiter, registerRateLimter, verifyEmailRateLimiter, loginRateLimiter } = require("../middleware/rate-limiter")
const { authenticateUser } = require("../middleware/authentication")

router.post("/register", registerRateLimter, register)
router.post("/verify-email", verifyEmailRateLimiter, verifyEmail)
router.post("/resend-verification-code", resendVerificationCodeRateLimiter, resendVerificationCode)
router.post("/login", loginRateLimiter, login)
router.delete("/logout", authenticateUser, logout)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)

module.exports = router