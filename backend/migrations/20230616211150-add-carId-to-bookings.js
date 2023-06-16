"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Bookings", "carId", {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: "Cars",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Bookings", "carId");
	},
};
