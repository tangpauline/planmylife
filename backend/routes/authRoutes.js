const express = require("express");
const { googleAuth, googleCallback, sessionExists, logout } = require("../controllers/authController");

const router = express.Router();

router.get("/google", googleAuth); // Redirect to Google OAuth
router.get("/google/callback", googleCallback); // Handle OAuth callback
router.get("/session", sessionExists);
router.post("/logout", logout); // Logout route

module.exports = router;