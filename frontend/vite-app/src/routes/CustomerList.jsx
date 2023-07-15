import React from "react";
import PropTypes from "prop-types";
import useCustomersFetcher from "../components/CustomersFetcher";

const CustomerList = () => {
	const customers = useCustomersFetcher();
	console.log(customers);
	// the display below is to test access to the data. Full details will be linked to show page
	return (
		<div>
			<h1>Customer List</h1>
			{customers.map((customer) => (
				<div key={customer.id}>
					<h2>
						Customer: {customer.firstName} {customer.lastName}{" "}
						{customer.mobileNumber} {customer.email}
					</h2>
					<p>
						{customer.Vehicles[0].make} {customer.Vehicles[0].model} Last MOT:{" "}
						{customer.Vehicles[0].lastMot} Booking:{" "}
						{customer.Vehicles[0].Bookings[0].repair.toString()}{" "}
					</p>
					<p>
						Booking
						{customer.Vehicles[0].Bookings[0].quote}{" "}
					</p>
					{/* Rest of the customer details */}
				</div>
			))}
		</div>
	);
};

CustomerList.propTypes = {
	customers: PropTypes.array.isRequired,
};

export default CustomerList;

// code for simple display above
