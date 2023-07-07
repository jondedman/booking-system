const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

router.post("/login", passport.authenticate("local"), userController.login);
router.post("/register", userController.register);
router.get("/user", userController.getUser);

module.exports = router;
