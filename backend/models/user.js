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
	User.init({
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true, // Ensure uniqueness
			validate: {
				notNull: { msg: "Username is required" }, // Validate presence
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true, // Ensure uniqueness
			validate: {
				notNull: { msg: "Email is required" }, // Validate presence
				isEmail: { msg: "Invalid email format" }, // Validate email format
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: { msg: "Password is required" }, // Validate presence
			},
		},
	});
	return User;
};
