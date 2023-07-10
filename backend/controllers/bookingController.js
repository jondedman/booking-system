const { sequelize } = require("../models/index");
const { Booking } = sequelize.models;

// Controller methods
exports.getAllBookings = async (req, res) => {
	console.log("getAllBookings1");
	try {
		console.log("getAllBookings2");
		const bookings = await Booking.findAll();
		console.log(bookings);

		// Test code for accessing a specific booking
		const cust = await Booking.findOne({ where: { id: 1157 } });
		console.log("Test booking:");
		console.log(cust);

		res.json(bookings);
	} catch (error) {
		// console.log("Error in getAllBookings:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.getBookingById = async (req, res) => {
	const { id } = req.params;
	try {
		console.log("getBookingById:", id);
		const booking = await Booking.findByPk(id);
		console.log("Booking:", booking);
		if (!booking) {
			return res.status(404).json({ error: "booking not found" });
		}
		res.json(booking);
	} catch (error) {
		console.log("Error in getBookingById:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.createBooking = async (req, res) => {
	// needs to be changed to pass correct paramaters - look at seed file
	// Retrieve booking data from request body
	const { name, email } = req.body;

	try {
		console.log("Create booking:", name, email);
		const booking = await Booking.create({ name, email });
		res.status(201).json(booking);
	} catch (error) {
		console.log("Error in createBooking:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.updateBooking = async (req, res) => {
	const { id } = req.params;

	// Retrieve updated booking data from request body
	const { name, email } = req.body;

	try {
		console.log("Update booking:", id, name, email);
		const booking = await Booking.findByPk(id);
		if (!booking) {
			return res.status(404).json({ error: "booking not found" });
		}
		await Booking.update({ name, email }); // needs to be changes to pass correct paramaters
		res.json(booking);
	} catch (error) {
		console.log("Error in updateBooking:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.deleteBooking = async (req, res) => {
	const { id } = req.params;

	try {
		console.log("Delete booking:", id);
		const booking = await Booking.findByPk(id);
		if (!booking) {
			return res.status(404).json({ error: "Booking not found" });
		}
		await booking.destroy(); // booking or Booking?
		res.json({ message: "Booking deleted successfully" });
	} catch (error) {
		console.log("Error in deletebooking:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
