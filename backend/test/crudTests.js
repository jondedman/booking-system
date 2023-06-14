const { User, Customer, Car, Booking } = require("../models");
// Create a function to test the database
// NOTE: THIS FUNCTION WILL DELETE ALL DATA IN THE DATABASE THEN REPLACE WITH A SINGLE USER, CUSTOMER, CAR, AND BOOKING
async function testFunction() {
	try {
		// Delete all data in the database
		await Promise.all([
			User.destroy({ where: {} }),
			Customer.destroy({ where: {} }),
			Car.destroy({ where: {} }),
			Booking.destroy({ where: {} }),
		]);
		// Create a user
		const user = await User.create({
			username: "testuser",
			email: "testuser@example.com",
			password: "password123",
		});

		// Create a customer
		const customer = await Customer.create({
			firstName: "John",
			lastName: "Doe",
			email: "johndoe@example.com",
			mobileNumber: "1234567890",
			address: "123 Main St",
			userId: user.id, // Set the userId foreign key
		});

		// Create a car
		const car = await Car.create({
			make: "Toyota",
			registration: "ABC123",
			colour: "Blue",
			lastMot: new Date(),
			customerId: customer.id, // Set the customerId foreign key
		});

		// Create a booking
		const booking = await Booking.create({
			date: new Date(),
			time: "10:00 AM",
			mot: true,
			repair: false,
			diagnostic: false,
			complete: false,
			userId: user.id, // Set the userId foreign key
			customerId: customer.id, // Set the customerId foreign key
		});

		// Perform additional tests or assertions with the created data

		console.log("Test data created successfully.");
	} catch (error) {
		console.error("Error creating test data:", error);
	}
}

testFunction();
