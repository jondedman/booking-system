const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/", bookingController.getAllbookings);
router.get("/:id", bookingController.getbookingById);
router.post("/", bookingController.createbooking);
// Other booking routes
module.exports = router;
