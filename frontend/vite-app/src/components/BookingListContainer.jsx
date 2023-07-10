import React, { useEffect, useState } from "react";
import axios from "axios";

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

	return (
		<div>
			<h1>Bookings</h1>
			<ul>
				{bookings.map((booking) => (
					<li key={booking.id} style={{ display: "flex" }}>
						<span>Date: {booking.date}</span>
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
						{booking.User && (
							<span style={{ marginLeft: "10px" }}>
								Booked by: {booking.User.username}
							</span>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default BookingList;
