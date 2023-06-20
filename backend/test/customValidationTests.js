const { User, Customer, Vehicle, Booking } = require("../models");
const user = require("../models/user");
const vehicle = require("../models/vehicle");

async function testFunction() {
	const user = await User.create({
		username: "testuser",
		email: "mytest@gmail.com",
		password: "password123",
	});

	const customer = await Customer.create({
		firstName: "mr test",
		lastName: "Doe",
		email: "doe@doe.com",
		mobileNumber: "1234567890",
		adddress: "123 Main St",
		postcode: "AB1 2CD",
		notes: "test notes",
		userId: user.id,
	});

	const vehicle = await Vehicle.create({
		// make: "",
		registration: "ABC123",
		colour: "Blue",
		lastMot: new Date() - 1000 * 60 * 60 * 24 * 30 * 6, // how to change this to 6 months ago? instead of * 24, * 30, * 6: 1000 * 60 * 60 * 24 * 30 * 6
		customerId: customer.id,
		type: "Car",
		notes: "test notes",
	});
}

testFunction();
