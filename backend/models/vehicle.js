"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Vehicle extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Customer, { foreignKey: "customerId" });
			this.hasMany(models.Booking, { foreignKey: "vehicleId" });
		}
	}
	Vehicle.init(
		{
			make: DataTypes.STRING,
			registration: DataTypes.STRING,
			lastMot: DataTypes.DATE,
			colour: DataTypes.STRING,
			notes: DataTypes.STRING,
			type: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Vehicle",
		}
	);
	return Vehicle;
};
