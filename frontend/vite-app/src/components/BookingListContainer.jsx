import { useEffect, useState } from "react";
import axios from "axios";

function BookingList() {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		// Fetch the list of customers when the component mounts
		fetchBookings();
	}, []);

	const fetchBookings = async () => {
		try {
			const response = await axios.get("http://localhost:5174/bookings");
			setBookings(response.data);
		} catch (error) {
			console.error("Error fetching bookings:", error);
		}
	};

	return (
		<div>
			<h1>Booking List</h1>
			{bookings.map((booking) => (
				<div key={booking.id}></div>
			))}
		</div>
	);
}

export default BookingList;
