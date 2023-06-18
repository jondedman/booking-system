"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Booking extends Model {
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: "userId" });
			this.belongsTo(models.Car, { foreignKey: "carId" });
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
			date: {
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
						args: new Date().toDateString(), // Current date
						msg: "Booking date must be in the future.",
					},
				},
			},
			time: {
				type: DataTypes.TIME,
				allowNull: function () {
					return !this.mot; // Only required if mot is selected
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

			carId: {
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
		}
	);

	return Booking;
};
