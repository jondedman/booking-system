import { useEffect, useState } from "react";
import axios from "axios";

function CustomerList() {
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		// Fetch the list of customers when the component mounts
		fetchCustomers();
	}, []);

	const fetchCustomers = async () => {
		try {
			const response = await axios.get("http://localhost:8080/customers");
			setCustomers(response.data);
		} catch (error) {
			console.error("Error fetching customers:", error);
		}
	};

	return (
		<div>
			<h1>Customer List</h1>
			{customers.map((customer) => (
				<div key={customer.id}>
					<h3>{customer.firstName}</h3>
					<p>Email: {customer.email}</p>
				</div>
			))}
		</div>
	);
}

export default CustomerList;
