const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get(
	"/getAllCustomersDetails",
	customerController.getAllCustomersDetails
);
router.get("/getAllCustomers", customerController.getAllCustomers);
router.get("/:id", customerController.getCustomerById);
router.post("/", customerController.createCustomer);
// Other customer routes...

module.exports = router;

// note route prefixes must be unique
