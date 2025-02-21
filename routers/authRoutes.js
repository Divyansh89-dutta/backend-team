const express = require('express');
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController"); 
const { protect, isAdmin } = require("../middleware/authMiddleware"); 
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, isAdmin, getUserProfile);

module.exports = router;
