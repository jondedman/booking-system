module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Customers", "dateAdded");
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Customers", "dateAdded", {
			type: Sequelize.DATE,
			allowNull: true,
		});
	},
};
