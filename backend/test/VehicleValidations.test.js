const { sequelize } = require("../models");
const { Vehicle, Customer } = require("../models"); // customer model is never used

describe("Vehicle Model Validations", () => {
	beforeAll(async () => {
		await sequelize.authenticate();
	});

	afterAll(async () => {
		await sequelize.close();
	});

	test("should require make field", async () => {
		try {
			// Create a vehicle without a make
			await Vehicle.create({
				registration: "ABC123",
				lastMot: new Date() - 1000 * 60 * 60 * 24,
				colour: "Blue",
				type: "Car",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe("Vehicle.make cannot be null");
		}
	});

	test("should require make field to be not empty", async () => {
		try {
			// Create a vehicle with an empty make
			await Vehicle.create({
				make: "",
				registration: "ABC123",
				lastMot: new Date() - 1000 * 60 * 60 * 24,
				colour: "Blue",
				type: "Car",
			});
			throw new Error("Expected make field to be required");
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe(
				"Validation notEmpty on make failed"
			);
		}
	});

	test("should require registration field", async () => {
		try {
			// Create a vehicle without a registration
			await Vehicle.create({
				make: "Toyota",
				lastMot: new Date() - 1000 * 60 * 60 * 24,
				colour: "Blue",
				type: "Bike",
				notes: "test notes",
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
				notes: "test notes",
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
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe(
				"Vehicle.lastMot must be in the past"
			);
		}
	});

	test("should require colour field", async () => {
		try {
			// Create a vehicle without a colour
			await Vehicle.create({
				make: "Toyota",
				registration: "ABC123",
				lastMot: new Date() - 1000 * 60 * 60 * 24,
				type: "Car",
				notes: "test notes",
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
				"Vehicle.lastMot must be a valid date"
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

test("should require registration field to be not empty", async () => {
	try {
		// Create a vehicle with an empty registration
		await Vehicle.create({
			make: "Toyota",
			registration: "",
			lastMot: new Date() - 1000 * 60 * 60 * 24,
			colour: "Blue",
			type: "Car",
		});
	} catch (error) {
		expect(error.name).toBe("SequelizeValidationError");
		expect(error.errors[0].message).toBe(
			"Vehicle.registration cannot be empty"
		);
	}
});

test("should require colour field to be not empty", async () => {
	try {
		// Create a vehicle with an empty colour
		await Vehicle.create({
			make: "Toyota",
			registration: "ABC123",
			lastMot: new Date() - 1000 * 60 * 60 * 24,
			colour: "",
			type: "Car",
		});
	} catch (error) {
		expect(error.name).toBe("SequelizeValidationError");
		expect(error.errors[0].message).toBe("Vehicle.colour cannot be empty");
	}
});

test("should require type field to be not empty", async () => {
	try {
		// Create a vehicle with an empty type
		await Vehicle.create({
			make: "Toyota",
			registration: "ABC123",
			lastMot: new Date() - 1000 * 60 * 60 * 24,
			colour: "Blue",
			type: "",
		});
	} catch (error) {
		expect(error.name).toBe("SequelizeValidationError");
		expect(error.errors[0].message).toBe("Validation notEmpty on type failed");
	}
});
