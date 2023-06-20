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
			make: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			registration: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: {
						msg: "Vehicle.registration cannot be empty",
					},
				},
			},
			// lastMot: {
			// 	type: DataTypes.DATE,
			// 	allowNull: false,
			// 	validate: {
			// 		isDate: true,
			// 		// Ensures the date is in the past the T splits the date and time and [0] selects the date
			// 		isBefore: new Date().toISOString().split("T")[0], // Ensures the date is in the past
			// 	},
			// },
			lastMot: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					isDate: {
						msg: "Vehicle.lastMot must be a valid date",
					},
					isPastDate(value) {
						if (new Date(value) >= new Date()) {
							throw new Error("Vehicle.lastMot must be in the past");
						}
					},
					notEmpty: {
						msg: "Vehicle.lastMot cannot be empty",
					},
				},
			},

			colour: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Vehicle.colour cannot be empty",
					},
				},
			},

			notes: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{
			sequelize,
			modelName: "Vehicle",
		}
	);
	return Vehicle;
};
