const express = require("express")
const router = express.Router()

const { register, login, verifyEmail, resendVerificationCode, } = require("../controllers/authController")

const resendVerificationCodeLimiter = require("../middleware/resend-verification-code-limiter")

router.post("/register", register)
router.post("/verify-email", verifyEmail)
router.post("/resend-verification-code", resendVerificationCodeLimiter, resendVerificationCode)
router.post("/login", login)

module.exports = router