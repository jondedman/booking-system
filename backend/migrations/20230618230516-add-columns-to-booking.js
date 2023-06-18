"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Bookings", "parts", {
			type: Sequelize.INTEGER,
			allowNull: true,
		});

		await queryInterface.addColumn("Bookings", "labor", {
			type: Sequelize.INTEGER,
			allowNull: true,
		});

		await queryInterface.addColumn("Bookings", "quote", {
			type: Sequelize.INTEGER,
			allowNull: true,
		});

		await queryInterface.addColumn("Bookings", "notes", {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Bookings", "parts");
		await queryInterface.removeColumn("Bookings", "labor");
		await queryInterface.removeColumn("Bookings", "quote");
		await queryInterface.removeColumn("Bookings", "notes");
	},
};
