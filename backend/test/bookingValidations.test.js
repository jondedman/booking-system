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

		test("should not allow booking without a startDate", async () => {
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					mot: true,
					repair: false,
					diagnostic: false,
					// startDate: "2023-06-22",
					endDate: new Date("2023-06-22 10:00:00"),
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
				throw new Error("Expected validation error for missing startDate");
			} catch (error) {
				expect(error.errors[0].message).toBe(
					"Booking.startDate cannot be null"
				);
			}
		});

		test("should not allow booking without an endDate", async () => {
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					mot: true,
					repair: false,
					diagnostic: false,
					startDate: new Date("2024-06-22 10:00:00"),
					// endDate: new Date("2023-06-22 10:00:00"),
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
				throw new Error("Expected validation error for missing endDate");
			} catch (error) {
				expect(error.errors[0].message).toBe("Booking.endDate cannot be null");
			}
		});

		test("should not allow booking with a date in the past", async () => {
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					mot: true,
					repair: false,
					diagnostic: false,
					startDate: new Date("2020-01-01 10:00:00"),
					endDate: new Date("2020-01-01 11:00:00"),
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

		test("startDate should not be empty", async () => {
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					mot: false,
					repair: true,
					diagnostic: false,
					startDate: "",
					endDate: new Date("2025-01-01"),
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
				throw new Error("Expected validation error for empty startDate");
			} catch (error) {
				expect(error.message).toContain(
					"Validation notEmpty on startDate failed"
				);
			}
		});

		test("startDate should be a valid format", async () => {
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					mot: false,
					repair: true,
					diagnostic: true,
					startDate: "2022-30-02", // Invalid date format
					endDate: new Date("2025-01-01 10:00:00"),
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
				throw new Error(
					"Expected validation error for invalid startDate format"
				);
			} catch (error) {
				expect(error.errors[0].message).toBe(
					"Validation isDate on startDate failed"
				);
			}
		});

		test("endDate should be a valid format", async () => {
			const { user, customer, vehicle } = await findDetails();
			try {
				await Booking.create({
					mot: false,
					repair: true,
					diagnostic: true,
					startDate: new Date("2025-01-01 10:00:00"),
					endDate: "2022-30-02", // Invalid date format
					complete: false,
					vehicleId: vehicle.id,
					customerId: customer.id,
					userId: user.id,
					parts: 200,
					labor: 250,
					quote: 450,
					notes: "test notes",
				});
				throw new Error("Expected validation error for invalid endDate format");
			} catch (error) {
				expect(error.errors[0].message).toBe(
					"Validation isDate on endDate failed"
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
					startDate: futureDate,
					endDate: futureDate,
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
					startDate: new Date("2025-01-01 10:00:00"),
					endDate: new Date("2025-01-01 11:00:00"),
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
					mot: false,
					repair: true,
					diagnostic: false,
					startDate: new Date("2025-01-01 10:00:00"),
					endDate: new Date("2025-01-01 11:00:00"),
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
					startDate: new Date("2025-01-01"),
					endDate: new Date("2025-01-01"),
					mot: false,
					repair: true,
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
					startDate: new Date("2025-01-01 10:00:00"),
					endDate: new Date("2025-01-01 11:00:00"),
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
					startDate: new Date("2025-01-01"),
					endDate: new Date("2025-01-01"),
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
					startDate: new Date("2025-01-01 10:00:00"),
					endDate: new Date("2025-01-01 11:00:00"),
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
					startDate: new Date("2025-01-01"),
					endDate: new Date("2025-01-01"),
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
					startDate: new Date("2025-01-01"),
					endDate: new Date("2025-01-01"),
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
				startDate: new Date("2025-01-01 10:00:00"),
				endDate: new Date("2025-01-01 11:00:00"),
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
					startDate: new Date("2025-01-01"),
					endDate: new Date("2025-01-01"),
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
				startDate: new Date("2025-01-01"),
				endDate: new Date("2025-01-01"),
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
					startdate: new Date("2025-01-01"),
					endDate: new Date("2025-01-01"),
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
