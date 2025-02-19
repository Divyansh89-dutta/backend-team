const express = require('express');
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController"); // Use require
const { protect, isAdmin } = require("../middleware/authMiddleware"); // Use require

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, isAdmin, getUserProfile);

module.exports = router; // Use module.exports instead of export default
