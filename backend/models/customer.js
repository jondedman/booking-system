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
			this.hasMany(models.Vehicle, { foreignKey: "customerId" });
			this.hasMany(models.Booking, { foreignKey: "customerId" });
		}
	}
	//test
	Customer.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			mobileNumber: DataTypes.STRING,
			address: DataTypes.STRING,
			postcode: DataTypes.STRING,
			notes: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Customer",
		}
	);
	return Customer;
};
