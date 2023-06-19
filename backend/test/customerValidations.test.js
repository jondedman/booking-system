const { Sequelize } = require("sequelize");
const { Customer } = require("../models");

describe("Customer Model Validations", () => {
	test("should require firstName field", async () => {
		try {
			// Create a customer without a firstName
			await Customer.create({
				lastName: "Doe",
				email: "test@example.com",
				mobileNumber: "1234567890",
				address: "123 Street, City",
				dateAdded: new Date(),
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
		}
	});

	test("should require lastName field", async () => {
		try {
			// Create a customer without a lastName
			await Customer.create({
				firstName: "John",
				email: "test@example.com",
				mobileNumber: "1234567890",
				address: "123 Street, City",
				dateAdded: new Date(),
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
		}
	});

	test("should require email field", async () => {
		try {
			// Create a customer without an email
			await Customer.create({
				firstName: "John",
				lastName: "Doe",
				mobileNumber: "1234567890",
				address: "123 Street, City",
				dateAdded: new Date(),
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
		}
	});

	test("should require mobileNumber field", async () => {
		try {
			// Create a customer without a mobileNumber
			await Customer.create({
				firstName: "John",
				lastName: "Doe",
				email: "test@example.com",
				address: "123 Street, City",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
		}
	});

	test("should require address field", async () => {
		try {
			// Create a customer without an address
			await Customer.create({
				firstName: "John",
				lastName: "Doe",
				email: "test@example.com",
				mobileNumber: "1234567890",
				dateAdded: new Date(),
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
		}
	});
});
