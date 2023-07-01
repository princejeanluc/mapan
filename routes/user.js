const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/user.js")
const checkInscrData = require("../middlewares/checkInscriptionData.js")
const checkLoginData = require("../middlewares/checkLoginData.js")

router.post("/signup",checkInscrData,userCtrl.signup)
router.post("/login",checkLoginData,userCtrl.login)

module.exports = router