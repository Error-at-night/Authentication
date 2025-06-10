const express = require("express")
const router = express.Router()

const { showCurrentUser } = require("../controllers/userController")
const { authenticateUser } = require("../middleware/authentication")

router.get("/show-me", authenticateUser, showCurrentUser)

module.exports = router