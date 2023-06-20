"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	class Customer extends Model {
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: "userId" });
			this.hasMany(models.Vehicle, { foreignKey: "customerId" });
			this.hasMany(models.Booking, { foreignKey: "customerId" });
		}
	}

	Customer.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
					isEmail: true,
				},
			},
			mobileNumber: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			postcode: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			notes: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Customer",
			indexes: [
				{
					unique: true,
					fields: ["firstName", "lastName", "postcode"],
				},
			],
		}
	);

	return Customer;
};
