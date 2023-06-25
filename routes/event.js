const express = require("express")
const eventCtrl = require("../controllers/event.js")
const router = express.Router()

//create an event
router.post("/create",eventCtrl.createEvent)

// read an event
router.get("/get/:id",eventCtrl.getEvent)

//read all event
router.get("/getAll",eventCtrl.getAllEvents)

//update event

router.put("/update",eventCtrl.updateEvent)

//delete event
router.delete("/delete/:id/:idUser",eventCtrl.deleteEvent)




module.exports = router