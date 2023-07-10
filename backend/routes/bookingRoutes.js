const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/getAllBookings", bookingController.getAllBookings);
// router.get("/:id", bookingController.getbookingById);
// router.post("/", bookingController.createbooking);
// Other booking routes
module.exports = router;

// for reference
// router.post("/login", userController.login);
// router.post("/register", userController.register);
// router.get("/user", userController.getUser);
// router.get("/logout", userController.logout);

// module.exports = router;
