const express = require("express");
const router = express.Router();
const { upload } = require("../utils/upload"); 
const { protect, isAdmin } = require("../middleware/authMiddleware");
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require("../controllers/eventController");


router.post("/", upload.single("image"), createEvent);
router.get("/", getEvents);
router.get("/:id",protect,isAdmin, getEventById);
router.put("/:id",protect,isAdmin, upload.single("image"), updateEvent);
router.delete("/:id",protect, isAdmin, deleteEvent);

module.exports = router;
