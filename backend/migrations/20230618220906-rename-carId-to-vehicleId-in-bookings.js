"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.renameColumn("Bookings", "carId", "vehicleId");
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.renameColumn("Bookings", "vehicleId", "carId");
	},
};
