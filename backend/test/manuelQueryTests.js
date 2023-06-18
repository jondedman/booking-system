const { sequelize } = require("../models");
const { Booking, User, Vehicle, Customer } = require("../models");

(async () => {
	try {
		// Connect to the database
		await sequelize.authenticate();

		const userId = 200;

		try {
			// Find the user with the desired ID
			const user = await User.findByPk(userId, {
				include: {
					model: Booking,
					include: [Vehicle, Customer],
				},
			});

			if (!user) {
				throw new Error("User not found");
			}

			// Access the booking and vehicle associated with the user
			const booking = user.Bookings[0]; // Assuming there is only one booking
			console.log("Booking:", booking.get({ plain: true })); // Convert to plain object
			const vehicleMake = booking.Vehicle.make;
			console.log("Vehicle make:", vehicleMake);
			const vehicleRegistration = booking.Vehicle.registration;
			console.log("Vehicle registration:", vehicleRegistration);
			// const customer = booking.Customer;
			// console.log("Customer:", customer);
			const customerFirstName = booking.Customer.firstName;
			console.log("Customer first name:", customerFirstName);
		} catch (error) {
			console.error("Error:", error);
		}

		// Close the database connection
		await sequelize.close();
	} catch (error) {
		console.error("Error:", error);
	}
})();
