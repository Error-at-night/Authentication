const express = require("express")
const router = express.Router()

const { register, login, verifyEmail, resendVerificationCode, } = require("../controllers/authController")

router.post("/register", register)
router.post("/verify-email", verifyEmail)
router.post("/resend-verification-code", resendVerificationCode)
router.post("/login", login)

module.exports = router