const express = require("express")
const routerAuth = express.Router()
const routerUser = express.Router()
const userCtrl = require("../controllers/user.js")
const checkInscrData = require("../middlewares/checkInscriptionData.js")
const checkLoginData = require("../middlewares/checkLoginData.js")
const auth = require("../middlewares/auth.js")

routerAuth.post("/signup",checkInscrData,userCtrl.signup)
routerAuth.post("/login",checkLoginData,userCtrl.login)
routerUser.get("",auth,userCtrl.getUser)
routerUser.get("/:id",auth,userCtrl.getUserById)
module.exports = {routerAuth,routerUser}