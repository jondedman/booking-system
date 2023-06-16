const { Sequelize, DataTypes } = require("sequelize");
const { Car, Customer } = require("../models");

// Create a Sequelize instance
const sequelize = new Sequelize("rdadb", "jondedman", null, {
	dialect: "postgres", // Replace with your preferred database dialect
	// Add other necessary options here
});

describe("Car Model Validations", () => {
	test("should require make field", async () => {
		try {
			// Create a car without a make
			await Car.create({
				registration: "ABC123",
				lastMot: new Date(),
				colour: "Blue",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
			// expect(error.errors[0].message).toBe("Car.make cannot be null");
		}
	});

	test("should require registration field", async () => {
		try {
			// Create a car without a registration
			await Car.create({
				make: "Toyota",
				lastMot: new Date(),
				colour: "Blue",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
			// expect(error.errors[0].message).toBe("Car.registration cannot be null");
		}
	});

	test("should require lastMot field", async () => {
		try {
			// Create a car without a lastMot
			await Car.create({
				make: "Toyota",
				registration: "ABC123",
				colour: "Blue",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
			// expect(error.errors[0].message).toBe("Car.lastMot cannot be null");
		}
	});

	test("should require colour field", async () => {
		try {
			// Create a car without a colour
			await Car.create({
				make: "Toyota",
				registration: "ABC123",
				lastMot: new Date(),
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
			// expect(error.errors[0].message).toBe("Car.colour cannot be null");
		}
	});

	test("should belong to a customer", async () => {
		// Select the first customer from the database
		const customer = await Customer.findOne();

		// Create a car associated with the customer
		const car = await Car.create({
			make: "Toyota",
			registration: "ABC123",
			lastMot: new Date(),
			colour: "Blue",
			customerId: customer.id,
		});

		expect(car.customerId).toBe(customer.id);
	});
});
