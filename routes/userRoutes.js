const express = require("express");

const authController = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// router.use((req, res, next) => {
//   console.log("test");
// });

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/me", protect, authController.me);

module.exports = router;
