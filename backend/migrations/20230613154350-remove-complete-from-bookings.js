"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Bookings", "complete");
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Bookings", "complete", {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: false,
		});
	},
};
