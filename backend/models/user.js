"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Booking, { foreignKey: "userId" });
			this.hasMany(models.Customer, { foreignKey: "userId" });
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notNull: {
						msg: "Username is required",
					},
					notEmpty: {
						msg: "Username cannot be empty",
					},
					len: {
						args: [3, 20],
						msg: "Username must be between 3 and 20 characters",
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notNull: {
						msg: "Email is required",
					},
					notEmpty: {
						msg: "Email cannot be empty",
					},
					isEmail: {
						msg: "Invalid email format",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Password is required",
					},
					notEmpty: {
						msg: "Password cannot be empty",
					},
					len: {
						args: [6, 100],
						msg: "Password must be between 6 and 20 characters",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);

	return User;
};
