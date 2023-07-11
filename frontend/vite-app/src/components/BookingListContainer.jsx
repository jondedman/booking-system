import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";

function BookingList() {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		fetchBookings();
	}, []);

	const fetchBookings = async () => {
		try {
			const response = await axios.get(
				"http://localhost:5173/bookings/getAllBookings",
				{
					withCredentials: true,
				}
			);
			setBookings(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching bookings:", error);
		}
	};

	const formatBookingDate = (dateString) => {
		const bookingDate = DateTime.fromISO(dateString);
		return bookingDate.toLocaleString(DateTime.DATETIME_MED); // Format the date as desired
	};

	return (
		<div>
			<h1>Bookings for RD Autos</h1>
			<ul>
				{bookings.map((booking) => (
					<li key={booking.id} style={{ display: "flex" }}>
						<span>Date: {formatBookingDate(booking.date)}</span>
						{booking.Customer && (
							<span style={{ marginLeft: "10px" }}>
								Customer: {booking.Customer.lastName}
							</span>
						)}
						{booking.Vehicle && (
							<span style={{ marginLeft: "10px" }}>
								Vehicle:{" "}
								{booking.Vehicle.make +
									" " +
									"Reg:" +
									booking.Vehicle.registration}
							</span>
						)}
						<span>{`Mot: ${booking.mot} Repair: ${booking.repair} Diagnostic: ${booking.diagnostic}`}</span>

						{booking.User && (
							<span style={{ marginLeft: "10px" }}>
								Booked by:{" "}
								{booking.User.username +
									" " +
									"on" +
									" " +
									formatBookingDate(booking.createdAt) +
									" "}
							</span>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default BookingList;
