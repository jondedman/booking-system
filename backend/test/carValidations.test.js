const { Sequelize } = require("sequelize");
const { Car, Customer } = require("../models");

// Create a Sequelize instance
const sequelize = new Sequelize("rdab", "jondedman", null, {
	dialect: "postgres", // Replace with your preferred database dialect
	// Add other necessary options here
});

describe("Car Model Validations", () => {
	let customer;

	beforeEach(async () => {
		// Generate a unique email for each test
		const uniqueEmail = `test${Date.now()}@example.com`;

		// Create a unique customer record before each test
		customer = await Customer.create({
			email: uniqueEmail,
			// Other customer data...
		});
	});

	test("should require make field", async () => {
		try {
			// Create a car without a make
			await Car.create({
				registration: "ABC123",
				lastMot: new Date(),
				colour: "Blue",
				customerId: customer.id,
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
		}
	});

	test("should require registration field", async () => {
		try {
			// Create a car without a registration
			await Car.create({
				make: "Toyota",
				lastMot: new Date(),
				colour: "Blue",
				customerId: customer.id,
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
		}
	});

	test("should require lastMot field with a valid date format", async () => {
		try {
			// Create a car with an invalid lastMot date format
			await Car.create({
				make: "Toyota",
				registration: "ABC123",
				lastMot: "2022-06-15", // Invalid date format
				colour: "Blue",
				customerId: customer.id,
			});
		} catch (error) {
			console.log(error); // Log the error object to the console
			expect(error.name).toBe("SequelizeDatabaseError");
			// Check if error.errors array exists and has at least one error
			expect(Array.isArray(error.errors)).toBe(true);
			expect(error.errors.length).toBeGreaterThan(0);
			// Check the specific error message related to the lastMot field
			const lastMotError = error.errors.find((err) => err.path === "lastMot");
			expect(lastMotError.message).toBe("Validation isDate on lastMot failed");
		}
	});

	test("should require colour field", async () => {
		try {
			// Create a car without a colour
			await Car.create({
				make: "Toyota",
				registration: "ABC123",
				lastMot: new Date(),
				customerId: customer.id,
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
		}
	});
});
