import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingsFetcher = () => {
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
		} catch (error) {
			console.error("Error fetching bookings:", error);
		}
	};

	return bookings;
};

export default BookingsFetcher;
