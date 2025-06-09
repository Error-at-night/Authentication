const express = require("express")
const router = express.Router()

const { register, login, verifyEmail, resendVerificationCode, logout, forgotPassword, resetPassword, } = require("../controllers/authController")
const { resendVerificationCodeRateLimit, registerRateLimit, verifyEmailRateLimit, loginRateLimit } = require("../middleware/rate-limit")
const { authenticateUser } = require("../middleware/authentication")

router.post("/register", registerRateLimit, register)
router.post("/verify-email", verifyEmailRateLimit, verifyEmail)
router.post("/resend-verification-code", resendVerificationCodeRateLimit, resendVerificationCode)
router.post("/login", loginRateLimit, login)
router.delete("/logout", authenticateUser, logout)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)

module.exports = router