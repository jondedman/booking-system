"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Bookings", "time");
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Bookings", "time", {
			type: Sequelize.TIME,
			allowNull: true,
		});
	},
};
