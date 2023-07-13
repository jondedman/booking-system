// import { useEffect, useState } from "react";
// import axios from "axios";
// // // i also need this to fetch associated vehicles and bookings - see how i retrieved bookings in bookinglistcontainer
// // // i also need to make sure this is called via the dashboard button - which will render this in place of the bookinglistcontainer?
// function CustomerList() {
// 	// 	const [customers, setCustomers] = useState([]);

// 	// 	useEffect(() => {
// 	// 		// Fetch the list of customers when the component mounts
// 	// 		fetchCustomers();
// 	// 	}, []);

// 	// 	const fetchCustomers = async () => {
// 	// 		try {
// 	// 			const response = await axios.get("http://localhost:5173/customers");
// 	// 			setCustomers(response.data);
// 	// 		} catch (error) {
// 	// 			console.error("Error fetching customers:", error);
// 	// 		}
// 	// 	};
// 	console.log("customer list");
// 	return (
// 		<div>
// 			<h1>Customer List</h1>
// 			{/* {customers.map((customer) => (
// 				<div key={customer.id}>
// 					<h3>{customer.firstName}</h3>
// 					<p>Email: {customer.email}</p>
// 				</div>
// 			))} */}
// 		</div>
// 	);
// }

// export default CustomerList;
import React from "react";
console.log("customer list");
function CustomerList() {
	return (
		<div>
			<h1>Customer List</h1>
		</div>
	);
}

export default CustomerList;
