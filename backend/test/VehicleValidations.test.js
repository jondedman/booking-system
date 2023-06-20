const { Sequelize, DataTypes } = require("sequelize");
const { Vehicle, Customer } = require("../models");

describe("Vehicle Model Validations", () => {
	test("should require make field", async () => {
		try {
			// Create a vehicle without a make
			await Vehicle.create({
				registration: "ABC123",
				lastMot: new Date(),
				colour: "Blue",
				type: "Car",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe("Vehicle.make cannot be null");
		}
	});

	test("should require registration field", async () => {
		try {
			// Create a vehicle without a registration
			await Vehicle.create({
				make: "Toyota",
				lastMot: new Date(),
				colour: "Blue",
				type: "Bike",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe(
				"Vehicle.registration cannot be null"
			);
		}
	});

	test("should require lastMot field", async () => {
		try {
			// Create a vehicle without a lastMot
			await Vehicle.create({
				make: "Toyota",
				registration: "ABC123",
				colour: "Blue",
				type: "Car",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe("Vehicle.lastMot cannot be null");
		}
	});

	test("should require lastMot field to be in the past", async () => {
		try {
			// Create a vehicle with a future lastMot date
			await Vehicle.create({
				make: "Toyota",
				registration: "ABC123",
				lastMot: new Date(Date.now() + 1000 * 60 * 60 * 24), // Set the date to tomorrow
				colour: "Blue",
				type: "Car",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe(
				"Validation isBefore on lastMot failed"
			);
		}
	});

	test("should require colour field", async () => {
		try {
			// Create a vehicle without a colour
			await Vehicle.create({
				make: "Toyota",
				registration: "ABC123",
				lastMot: new Date(),
				type: "Car",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe("Vehicle.colour cannot be null");
		}
	});

	test("should require lastMot field to be in a valid date format", async () => {
		try {
			// Create a vehicle with an invalid lastMot date format
			await Vehicle.create({
				make: "Toyota",
				registration: "ABC123",
				colour: "Blue",
				lastMot: "Saturday", // Invalid date format just has a day of the week
				type: "Car",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe(
				"Validation isDate on lastMot failed"
			);
		}
	});

	test("should belong to a customer", async () => {
		try {
			// Create a vehicle without setting the customerId
			const vehicle = await Vehicle.create({
				make: "Toyota",
				registration: "ABC123",
				lastMot: new Date(Date.now() - 1000 * 60 * 60 * 24),
				colour: "Blue",
				type: "Car",
			});

			expect(vehicle.customerId).toBeNull();
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
			expect(error.message).toContain(
				'null value in column "customerId" of relation "Vehicles" violates not-null constraint'
			);
		}
	});
});
