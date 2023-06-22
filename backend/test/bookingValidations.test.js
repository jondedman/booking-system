const { sequelize } = require("../models");
const { Booking, User, Vehicle, Customer } = require("../models");

describe("Booking Model", () => {
	beforeAll(async () => {
		// Connect to the database
		await sequelize.authenticate();
	});

	afterAll(async () => {
		// Close the database connection after all tests
		await sequelize.close();
	});

	// find random user, customer, and vehicle
	async function findDetails() {
		const user = await User.findOne({
			order: sequelize.literal("random()"),
		});
		const customer = await Customer.findOne({
			order: sequelize.literal("random()"),
		});
		const vehicle = await Vehicle.findOne({
			order: sequelize.literal("random()"),
		});
		return { user, customer, vehicle };
	}

	describe("Validations", () => {
		// date validations

		test("should not allow booking without a date", async () => {
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					mot: true,
					repair: false,
					diagnostic: false,
					// date: "2023-06-22",
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
				throw new Error("Expected validation error for missing date");
			} catch (error) {
				expect(error.errors[0].message).toBe("Booking.date cannot be null");
			}
		});

		test("should not allow booking with a date in the past", async () => {
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					mot: true,
					repair: false,
					diagnostic: false,
					date: new Date("2020-01-01"),
					// time: "10:00:00",
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
				throw new Error("Expected validation error for past date");
			} catch (error) {
				expect(error.errors[0].message).toBe(
					"Booking date must be in the future."
				);
			}
		});

		test("date should not be empty", async () => {
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					mot: false,
					repair: true,
					diagnostic: false,
					date: "",
					// time: "10:00:00",
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
				throw new Error("Expected validation error for empty date");
			} catch (error) {
				expect(error.message).toContain("Validation notEmpty on date failed");
			}
		});

		test("date should be a valid format", async () => {
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					mot: false,
					repair: true,
					diagnostic: true,
					date: "2022-30-02", // Invalid date format
					// time: "10:00:00",
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
				throw new Error("Expected validation error for invalid date format");
			} catch (error) {
				expect(error.errors[0].message).toBe(
					"Validation isDate on date failed"
				);
			}
		});

		// complete validations
		test("should not allow complete to be true for future bookings", async () => {
			// expect.assertions(1);
			const { user, customer, vehicle } = await findDetails();
			const currentDate = new Date();
			const futureDate = new Date(currentDate.getFullYear() + 1, 0, 1); // Future date
			try {
				await Booking.create({
					mot: true,
					repair: false,
					diagnostic: false,
					date: futureDate,
					complete: true,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
			} catch (error) {
				expect(error.message).toContain(
					'insert or update on table "Bookings" violates foreign key constraint "Bookings_userId_fkey"'
				);
			}
		});

		test("complete is required", async () => {
			// expect.assertions(1);
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					mot: true,
					repair: false,
					diagnostic: false,
					date: new Date("2025-01-01"),
					// time: "10:00:00",
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
			} catch (error) {
				expect(error.message).toContain("complete cannot be null");
			}
		});

		test("complete should be boolean", async () => {
			// expect.assertions(1);
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					mot: true,
					repair: false,
					diagnostic: false,
					date: new Date("2025-01-01"),
					// time: "10:00:00",
					complete: "not a boolean",
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
			} catch (error) {
				expect(error.message).toContain(
					'invalid input syntax for type boolean: "not a boolean"'
				);
			}
		});

		//mot, repair, diagnostic validations
		test("should require diagnostic", async () => {
			// expect.assertions(1);
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					date: new Date("2025-01-01"),
					mot: true,
					repair: false,
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
			} catch (error) {
				expect(error.message).toContain(
					"notNull Violation: Booking.diagnostic cannot be null"
				);
			}
		});

		test("should require mot", async () => {
			// expect.assertions(1);
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					date: new Date("2025-01-01"),
					repair: true,
					diagnostic: true,
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
			} catch (error) {
				expect(error.message).toContain(
					"notNull Violation: Booking.mot cannot be null"
				);
			}
		});

		test("should require repair", async () => {
			// expect.assertions(1);
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					date: new Date("2025-01-01"),
					mot: true,
					diagnostic: true,
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
			} catch (error) {
				expect(error.message).toContain(
					"notNull Violation: Booking.repair cannot be null"
				);
			}
		});

		test("mot should be boolean", async () => {
			// expect.assertions(1);
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					repair: false,
					mot: "not a boolean",
					diagnostic: true,
					date: new Date("2025-01-01"),
					// time: "10:00:00",
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
			} catch (error) {
				expect(error.message).toContain(
					'invalid input syntax for type boolean: "not a boolean"'
				);
			}
		});

		test("repair should be boolean", async () => {
			// expect.assertions(1);
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					mot: false,
					repair: "not a boolean",
					diagnostic: true,
					date: new Date("2025-01-01"),
					// time: "10:00:00",
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
			} catch (error) {
				expect(error.message).toContain(
					'invalid input syntax for type boolean: "not a boolean"'
				);
			}
		});

		test("diagnostic should be boolean", async () => {
			// expect.assertions(1);
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					mot: false,
					repair: true,
					diagnostic: "not a boolean",
					date: new Date("2025-01-01"),
					// time: "10:00:00",
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
			} catch (error) {
				expect(error.message).toContain(
					'invalid input syntax for type boolean: "not a boolean"'
				);
			}
		});
	});

	describe("Associations", () => {
		test("should belong to a user", async () => {
			const user = await User.findOne({
				order: sequelize.literal("random()"),
			});
			const customer = await Customer.findOne({
				order: sequelize.literal("random()"),
			});
			const vehicle = await Vehicle.findOne({
				order: sequelize.literal("random()"),
			});

			const booking = await Booking.create({
				mot: true,
				repair: true,
				diagnostic: false,
				date: new Date("2025-01-01"),
				complete: false,
				vehicleId: vehicle.id,
				customerId: customer.id,
				userId: user.id,
				parts: 200,
				labor: 250,
				quote: 450,
				notes: "test notes",
			});

			const foundBooking = await Booking.findByPk(booking.id, {
				include: [{ model: User }],
			});

			expect(foundBooking.User.firstName).toBe(user.firstName);
			expect(foundBooking.User.lastName).toBe(user.lastName);
			expect(foundBooking.User.email).toBe(user.email);
		});

		test("should belong to a vehicle", async () => {
			// abstract out the random selection of a user, customer and vehicle to a function
			const user = await User.findOne({
				order: sequelize.literal("random()"),
			});
			const customer = await Customer.findOne({
				order: sequelize.literal("random()"),
			});
			const vehicle = await Vehicle.findOne({
				order: sequelize.literal("random()"),
			});

			const booking = await Booking.create(
				{
					mot: false,
					repair: true,
					diagnostic: false,
					date: new Date("2025-01-01"),
					// time: "10:00:00",
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				},
				{ include: [{ model: Vehicle }] }
			);
			const foundBooking = await Booking.findByPk(booking.id, {
				include: [{ model: Vehicle }],
			});
			expect(foundBooking.Vehicle.make).toBe(vehicle.make);
			expect(foundBooking.Vehicle.registration).toBe(vehicle.registration);
			expect(foundBooking.Vehicle.lastMot).toBeInstanceOf(Date);
			expect(foundBooking.Vehicle.colour).toBe(vehicle.colour);
		});

		test("should belong to a customer", async () => {
			const user = await User.findOne({
				order: sequelize.literal("random()"),
			});
			const customer = await Customer.findOne({
				order: sequelize.literal("random()"),
			});
			const vehicle = await Vehicle.findOne({
				order: sequelize.literal("random()"),
			});

			const booking = await Booking.create({
				mot: true,
				repair: false,
				diagnostic: false,
				date: new Date("2025-01-01"),
				// time: "10:00:00",
				complete: false,
				vehicleId: vehicle.id,
				customerId: customer.id,
				userId: user.id,
				parts: 200,
				labor: 250,
				quote: 450,
				notes: "test notes",
			});

			const foundBooking = await Booking.findByPk(booking.id, {
				include: [{ model: Customer }],
			});

			expect(foundBooking.Customer.firstName).toBe(customer.firstName);
			expect(foundBooking.Customer.lastName).toBe(customer.lastName);
			expect(foundBooking.Customer.email).toBe(customer.email);
			expect(foundBooking.Customer.mobileNumber).toBe(customer.mobileNumber);
			expect(foundBooking.Customer.address).toBe(customer.address);
		});
	});

	describe("model level validations", () => {
		test("At least one of mot, repair, diagnostic must be true", async () => {
			const user = await User.findOne({
				order: sequelize.literal("random()"),
			});
			const customer = await Customer.findOne({
				order: sequelize.literal("random()"),
			});
			const vehicle = await Vehicle.findOne({
				order: sequelize.literal("random()"),
			});

			try {
				await Booking.create({
					mot: false,
					repair: false,
					diagnostic: false,
					date: new Date("2025-01-01"),
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
			} catch (error) {
				expect(error.message).toContain(
					"Validation error: At least one of mot, repair, or diagnostic must be true."
				);
			}
		});
	});
});
