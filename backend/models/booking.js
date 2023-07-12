"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Booking extends Model {
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: "userId" });
			this.belongsTo(models.Vehicle, { foreignKey: "vehicleId" });
			this.belongsTo(models.Customer, { foreignKey: "customerId" });
		}
	}

	Booking.init(
		{
			mot: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			repair: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			diagnostic: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			parts: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			labor: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			quote: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			notes: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			startDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					isFuture(value) {
						if (value < new Date()) {
							throw new Error("Booking date must be in the future.");
						}
					},
					notEmpty: true,
					isDate: true,
					isAfter: {
						args: new Date().toISOString().split("T")[0], // Current date
						msg: "Booking date must be in the future.",
					},
				},
			},
			endDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					isAfterStartDate(value) {
						if (value < this.startDate) {
							throw new Error(
								"Booking end date must be after booking start date."
							);
						}
					},
					notEmpty: false,
					isDate: true,
				},
			},
			complete: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				validate: {
					isValidCompleteStatus(value) {
						if (this.date && !value) {
							const currentDate = new Date();
							const bookingDate = new Date(this.date);
							if (bookingDate > currentDate && value !== false) {
								// Allow false values regardless of booking date
								throw new Error(
									"Booking completion can only be true for past bookings."
								);
							}
						}
					},
				},
			},
			arrived: {
				type: DataTypes.DATE,
				allowNull: true,
				validate: {
					isDate: true,
					isBefore: {
						args: new Date().toISOString().split("T")[0], // Ensures the date is in the past
						msg: "Arrival date must be in the past.",
					},
				},
			},
			vehicleId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			customerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Booking",
			validate: {
				atLeastOneTrue() {
					if (!(this.mot || this.repair || this.diagnostic)) {
						throw new Error(
							"At least one of mot, repair, or diagnostic must be true."
						);
					}
				},
			},
		}
	);

	return Booking;
};
