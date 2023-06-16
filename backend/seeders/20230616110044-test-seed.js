"use strict";

const faker = require("faker");
const { User, Customer, Car, Booking } = require("../models");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Revert seed logic in reverse order
		console.log("cleaning up...");
		// Revert bookings
		await Booking.destroy({ where: {} });

		// Revert cars
		await Car.destroy({ where: {} });

		// Revert customers
		await Customer.destroy({ where: {} });

		// Revert users
		await User.destroy({ where: {} });

		// Additional cleanup logic if needed

		await (async () => {
			// Seed users
			console.log("Seeding users...");
			const usersData = [];
			for (let i = 0; i < 5; i++) {
				usersData.push({
					username: faker.internet.userName(),
					email: faker.internet.email(),
					password: "12345678",
				});
			}
			await User.bulkCreate(usersData);

			// Seed customers
			console.log("Seeding customers...");
			const customersData = [];
			const users = await User.findAll();
			for (const user of users) {
				customersData.push({
					userId: user.id,
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					email: faker.internet.email(),
					mobileNumber: faker.phone.phoneNumber(),
					address: faker.address.streetAddress(),
					dateAdded: new Date(),
				});
			}
			await Customer.bulkCreate(customersData);
		})();

		await (async () => {
			// Seed cars
			console.log("Seeding cars...");
			const carsData = [];
			const customers = await Customer.findAll();
			for (const customer of customers) {
				carsData.push({
					customerId: customer.id,
					make: faker.vehicle.manufacturer(),
					model: faker.vehicle.model(),
					year: faker.datatype.number({ min: 2000, max: 2023 }),
					color: faker.commerce.color(),
					registration: faker.vehicle.vrm(),
					lastMot: faker.datatype.number({ min: 2020, max: 2023 }),
				});
			}
			await Car.bulkCreate(carsData);
		})();

		await (async () => {
			// Seed bookings
			console.log("Seeding bookings...");
			const bookingsData = [];
			const cars = await Car.findAll();
			const users = await User.findAll(); // Fetch all users from the database
			for (const car of cars) {
				const randomUser = users[Math.floor(Math.random() * users.length)]; // Select a random user from the fetched users
				bookingsData.push({
					carId: car.id,
					customerId: car.customerId,
					userId: randomUser.id, // Assign the id of the random user
					date: faker.date.future(),
					time: faker.time.recent("abbr"),
					mot: faker.datatype.boolean(),
					repair: faker.datatype.boolean(),
					diagnostic: faker.datatype.boolean(),
					complete: faker.datatype.boolean(),
				});
			}
			await Booking.bulkCreate(bookingsData);
		})();

		// Additional seed logic if needed
	},

	async down(queryInterface, Sequelize) {
		// Revert seed logic in reverse order

		// Revert bookings
		await Booking.destroy({ where: {} });

		// Revert cars
		await Car.destroy({ where: {} });

		// Revert customers
		await Customer.destroy({ where: {} });

		// Revert users
		await User.destroy({ where: {} });

		// Additional revert seed logic if needed
	},
};
