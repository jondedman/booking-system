"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Customer extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: "userId" });
			this.hasMany(models.Car, { foreignKey: "customerId" });
			this.hasMany(models.Booking, { foreignKey: "customerId" });
		}
	}
	Customer.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			mobileNumber: DataTypes.STRING,
			address: DataTypes.STRING,
			dateAdded: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "Customer",
		}
	);
	return Customer;
};
