"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Bookings", "arrived", {
			type: Sequelize.DATE,
			allowNull: true, // Modify as per your requirements
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Bookings", "arrived");
	},
};
