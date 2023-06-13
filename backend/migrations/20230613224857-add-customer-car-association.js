"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Cars", "customerId", {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: "Customers",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Cars", "customerId");
	},
};
