const { Sequelize, DataTypes } = require("sequelize");
const { Vehicle, Customer } = require("../models");

// // Create a Sequelize instance
// const sequelize = new Sequelize("rdadb", "jondedman", null, {
// 	dialect: "postgres", // Replace with your preferred database dialect
// 	// Add other necessary options here
// });

describe("Vehicle Model Validations", () => {
	test("should require make field", async () => {
		try {
			// Create a vehicle without a make
			await Vehicle.create({
				registration: "ABC123",
				lastMot: new Date(),
				colour: "Blue",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
			// expect(error.errors[0].message).toBe("Vehicle.make cannot be null");
		}
	});

	test("should require registration field", async () => {
		try {
			// Create a vehicle without a registration
			await Vehicle.create({
				make: "Toyota",
				lastMot: new Date(),
				colour: "Blue",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
			// expect(error.errors[0].message).toBe("Vehicle.registration cannot be null");
		}
	});

	test("should require lastMot field", async () => {
		try {
			// Create a vehicle without a lastMot
			await Vehicle.create({
				make: "Toyota",
				registration: "ABC123",
				colour: "Blue",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
			// expect(error.errors[0].message).toBe("Vehicle.lastMot cannot be null");
		}
	});

	test("should require colour field", async () => {
		try {
			// Create a vehicle without a colour
			await Vehicle.create({
				make: "Toyota",
				registration: "ABC123",
				lastMot: new Date(),
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
			// expect(error.errors[0].message).toBe("Vehicle.colour cannot be null");
		}
	});

	test("should belong to a customer", async () => {
		// Select the first customer from the database
		const customer = await Customer.findOne();

		// Create a vehicle associated with the customer
		const vehicle = await Vehicle.create({
			make: "Toyota",
			registration: "ABC123",
			lastMot: new Date(),
			colour: "Blue",
			customerId: customer.id,
		});

		expect(vehicle.customerId).toBe(customer.id);
	});
});
