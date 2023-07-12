"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.renameColumn("Bookings", "date", "startDate");
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.renameColumn("Bookings", "startDate", "date");
	},
};
