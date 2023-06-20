"use strict";
// note - for further fake data i may ned to reinstall faker from the  new communtiy version.
const faker = require("faker");
const { User, Customer, Vehicle, Booking } = require("../models");
const { col } = require("sequelize");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Revert seed logic in reverse order
		console.log("cleaning up...");
		// Revert bookings
		await Booking.destroy({ where: {} });

		// Revert vehicles
		await Vehicle.destroy({ where: {} });

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
					postcode: faker.address.zipCode(),
					notes: faker.lorem.sentence(),
				});
			}
			await Customer.bulkCreate(customersData);
		})();

		await (async () => {
			// Seed vehicles
			console.log("Seeding vehicles...");
			const colors = [
				"red",
				"blue",
				"green",
				"yellow",
				"black",
				"white",
				"silver",
				"lightgray",
				"silver",
				"darkgray",
				"gray",
				"dimgray",
				"lightslategray",
				"slategray",
				"darkslategray",
				"black",
			];
			const vehiclesData = [];
			const customers = await Customer.findAll();
			for (const customer of customers) {
				vehiclesData.push({
					customerId: customer.id,
					type: faker.vehicle.type(),
					make: faker.vehicle.manufacturer(),
					model: faker.vehicle.model(),
					year: faker.datatype.number({ min: 2000, max: 2023 }),
					colour: colors[Math.floor(Math.random() * colors.length)],
					registration: faker.vehicle.vrm(),
					lastMot: faker.datatype.number({ min: 2020, max: 2023 }),
					notes: faker.lorem.sentence(),
				});
			}
			await Vehicle.bulkCreate(vehiclesData);
		})();

		await (async () => {
			// Seed bookings
			console.log("Seeding bookings...");
			const bookingsData = [];
			const vehicles = await Vehicle.findAll();
			const users = await User.findAll(); // Fetch all users from the database
			for (const vehicle of vehicles) {
				const randomUser = users[Math.floor(Math.random() * users.length)]; // Select a random user from the fetched users
				bookingsData.push({
					vehicleId: vehicle.id,
					customerId: vehicle.customerId,
					userId: randomUser.id, // Assign the id of the random user
					date: faker.date.future(),
					// note this is depreacted, but use it for now
					time: faker.time.recent("abbr"),
					mot: faker.datatype.boolean(),
					repair: faker.datatype.boolean(),
					diagnostic: faker.datatype.boolean(),
					arrived: faker.date.recent(),
					complete: faker.datatype.boolean(),
					quote: faker.datatype.number({ min: 100, max: 1000 }),
					parts: faker.datatype.number({ min: 100, max: 1000 }),
					labor: faker.datatype.number({ min: 100, max: 1000 }),
					notes: faker.lorem.sentence(),
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

		// Revert vehicles
		await Vehicle.destroy({ where: {} });

		// Revert customers
		await Customer.destroy({ where: {} });

		// Revert users
		await User.destroy({ where: {} });

		// Additional revert seed logic if needed
	},
};
