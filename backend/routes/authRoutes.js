const express = require("express")
const router = express.Router()

const { register, login, verifyEmail, resendVerificationCode, logout, forgotPassword, resetPassword, refreshToken, } = require("../controllers/authController")
const { resendVerificationCodeRateLimit, registerRateLimit, verifyEmailRateLimit, loginRateLimit, forgotPasswordRateLimit, resetPasswordRateLimit } = require("../middleware/rate-limit")
const { authenticateUser } = require("../middleware/authentication")

router.post("/register", registerRateLimit, register)
router.post("/verify-email", verifyEmailRateLimit, verifyEmail)
router.post("/resend-verification-code", resendVerificationCodeRateLimit, resendVerificationCode)
router.post("/login", loginRateLimit, login)
router.get("/refresh-token", refreshToken)
router.delete("/logout", authenticateUser, logout)
router.post("/forgot-password", forgotPasswordRateLimit, forgotPassword)
router.post("/reset-password/:token", resetPasswordRateLimit, resetPassword)

module.exports = router