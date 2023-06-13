"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Bookings", "complete", {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Bookings", "complete");
	},
};
