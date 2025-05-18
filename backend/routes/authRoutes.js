const express = require("express")
const router = express.Router()

const { register, login, verifyEmail, } = require("../controllers/authController")

router.post("/register", register)
router.post("/verify-email", verifyEmail)
router.post("/login", login)

module.exports = router