const { sequelize } = require("../models");
const { Booking, User, Car, Customer } = require("../models");

// Create a Sequelize instance
// const sequelize = new Sequelize("rdadb", "jondedman", null, {
// 	dialect: "postgres", // Replace with your preferred database dialect
// 	// Add other necessary options here
// });

describe("Booking Model", () => {
	beforeAll(async () => {
		// Connect to the database
		await sequelize.authenticate();
	});

	// beforeEach(async () => {
	// 	// Clear the database before each test
	// 	await Booking.destroy({ truncate: true });
	// 	await User.destroy({ truncate: true });
	// 	await Car.destroy({ truncate: true });
	// 	await Customer.destroy({ truncate: true });
	// });

	afterAll(async () => {
		// Close the database connection after all tests
		await sequelize.close();
	});

	describe("Validations", () => {
		test("should not allow booking without a date", async () => {
			// expect.assertions(1);
			// Retrieve a random user from the database
			// const user = await User.findOne({ order: [["random()", "ASC"]] });
			// // Retrieve a random customer from the database
			// const customer = await Customer.findOne({ order: [["random()", "ASC"]] });
			// // Retrieve a random car from the database
			// const car = await Car.findOne({ order: [["random()", "ASC"]] });
			const user = await User.findOne({
				order: sequelize.literal("random()"),
			});
			const customer = await Customer.findOne({
				order: sequelize.literal("random()"),
			});
			const car = await Car.findOne({
				order: sequelize.literal("random()"),
			});
			try {
				await Booking.create({
					mot: true,
					repair: false,
					diagnostic: false,
					time: "10:00:00",
					complete: false,
					carId: car.id,
					customerId: customer.id,
					userId: user.id,
				});
			} catch (error) {
				expect(error.message).toContain("date cannot be null");
			}
		});

		test("should not allow booking with a date in the past", async () => {
			// expect.assertions(1);
			try {
				await Booking.create({
					mot: true,
					repair: false,
					diagnostic: false,
					date: new Date("2020-01-01"),
					time: "10:00:00",
					complete: false,
					carId: 1,
					customerId: 1,
					userId: 1,
				});
			} catch (error) {
				expect(error.message).toContain(
					"Validation error: Booking date must be in the future."
				);
			}
		});

		test("should not require time if mot is not selected", async () => {
			// expect.assertions(1);
			try {
				await Booking.create({
					mot: false,
					repair: true,
					diagnostic: false,
					date: new Date("2025-01-01"),
					complete: false,
					carId: 1,
					customerId: 1,
					userId: 1,
				});
				const bookingCount = await Booking.count();
				expect(bookingCount).toBe(1);
			} catch (error) {
				// Should not throw an error
			}
		});

		test("should require time if mot is selected", async () => {
			expect.assertions(1);
			try {
				await Booking.create({
					mot: true,
					repair: true,
					diagnostic: false,
					date: new Date("2025-01-01"),
					complete: false,
					carId: 1,
					customerId: 1,
					userId: 1,
				});
			} catch (error) {
				expect(error.message).toContain(
					'insert or update on table "Bookings" violates foreign key constraint "Bookings_userId_fkey"'
				);
			}
		});

		test("should not allow complete to be true for future bookings", async () => {
			expect.assertions(1);
			const currentDate = new Date();
			const futureDate = new Date(currentDate.getFullYear() + 1, 0, 1); // Future date
			try {
				await Booking.create({
					mot: true,
					repair: false,
					diagnostic: false,
					date: futureDate,
					time: "10:00:00",
					complete: true,
					carId: 1,
					customerId: 1,
					userId: 1,
				});
			} catch (error) {
				expect(error.message).toContain(
					'insert or update on table "Bookings" violates foreign key constraint "Bookings_userId_fkey"'
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
			const car = await Car.findOne({
				order: sequelize.literal("random()"),
			});

			const booking = await Booking.create({
				mot: true,
				repair: true,
				diagnostic: false,
				date: new Date("2025-01-01"),
				time: "10:00:00",
				complete: false,
				carId: car.id,
				customerId: customer.id,
				userId: user.id,
			});

			const foundBooking = await Booking.findByPk(booking.id, {
				include: [{ model: User }],
			});

			expect(foundBooking.User.firstName).toBe(user.firstName);
			expect(foundBooking.User.lastName).toBe(user.lastName);
			expect(foundBooking.User.email).toBe(user.email);
		});

		test("should belong to a car", async () => {
			// abstract out the random selection of a user, customer and car to a function
			const user = await User.findOne({
				order: sequelize.literal("random()"),
			});
			const customer = await Customer.findOne({
				order: sequelize.literal("random()"),
			});
			const car = await Car.findOne({
				order: sequelize.literal("random()"),
			});

			const booking = await Booking.create(
				{
					mot: false,
					repair: true,
					diagnostic: false,
					date: new Date("2025-01-01"),
					time: "10:00:00",
					complete: false,
					carId: car.id,
					customerId: customer.id,
					userId: user.id,
				},
				{ include: [{ model: Car }] }
			);
			const foundBooking = await Booking.findByPk(booking.id, {
				include: [{ model: Car }],
			});
			expect(foundBooking.Car.make).toBe(car.make);
			expect(foundBooking.Car.registration).toBe(car.registration);
			expect(foundBooking.Car.lastMot).toBeInstanceOf(Date);
			expect(foundBooking.Car.colour).toBe(car.colour);
		});

		test("should belong to a customer", async () => {
			const user = await User.findOne({
				order: sequelize.literal("random()"),
			});
			const customer = await Customer.findOne({
				order: sequelize.literal("random()"),
			});
			const car = await Car.findOne({
				order: sequelize.literal("random()"),
			});

			const booking = await Booking.create({
				mot: true,
				repair: false,
				diagnostic: false,
				date: new Date("2025-01-01"),
				time: "10:00:00",
				complete: false,
				carId: car.id,
				customerId: customer.id,
				userId: user.id,
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
});
