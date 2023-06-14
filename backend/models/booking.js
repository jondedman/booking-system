"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Booking extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: "userId" });
			this.belongsTo(models.Customer, { foreignKey: "customerId" });
		}
	}
	Booking.init(
		{
			mot: DataTypes.BOOLEAN,
			repair: DataTypes.BOOLEAN,
			diagnostic: DataTypes.BOOLEAN,
			date: DataTypes.DATE,
			time: DataTypes.TIME,
			complete: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Booking",
		}
	);
	return Booking;
};
