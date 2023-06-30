const express = require("express")
const eventCtrl = require("../controllers/event.js")
const router = express.Router()
const auth = require("../middlewares/auth.js")
const downloadImage = require("../middlewares/multer-config.js")
//create an event
router.post("/create",auth,downloadImage,eventCtrl.createEvent)

// read an event
router.get("/get/:id",auth,eventCtrl.getEvent)

//read all event
router.get("/getAll",auth,eventCtrl.getAllEvents)

//update event

router.put("/update/:id",auth,downloadImage,eventCtrl.updateEvent)

//delete event
router.delete("/delete/:id",auth,eventCtrl.deleteEvent)




module.exports = router