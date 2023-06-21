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
			// time: {
			// 	type: DataTypes.VIRTUAL,
			// 	allowNull: function () {
			// 		return !this.mot; // Only required if mot is selected
			// 	},
			// 	get() {
			// 		if (this.date) {
			// 			const time = this.date.toTimeString().slice(0, 5); // Extract time part
			// 			return time;
			// 		}
			// 		return null;
			// 	},
			// 	validate: {
			// 		isValidTime(value) {
			// 			if (this.mot && !/^\d{2}:\d{2}$/.test(value)) {
			// 				throw new Error("Invalid time format. Expected format: HH:mm");
			// 			}
			// 		},
			// 	},
			// },

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
				validateBookingAvailability() {
					const { Booking } = sequelize.models; // Reference to the Booking model

					const repairDiagnosticBookingsCount = Booking.count({
						where: {
							date: this.date,
							[Op.or]: [{ repair: true }, { diagnostic: true }],
						},
					});

					return repairDiagnosticBookingsCount.then((count) => {
						if (this.vehicle.type === "car") {
							if (count >= 3) {
								throw new Error(
									"No more than 3 cars can be booked on a single day for repair and diagnostic."
								);
							}
						} else if (this.vehicle.type === "bike") {
							if (count >= 2) {
								throw new Error(
									"No more than 2 bikes can be booked on a single day for repair and diagnostic."
								);
							}
						}
						if (count >= 5) {
							throw new Error(
								"No more than 5 vehicles in total can be booked on a single day for repair and diagnostic."
							);
						}
					});
				},
			},
		}
	);

	return Booking;
};
