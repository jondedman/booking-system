import React, { useEffect, useState } from "react";
import axios from "axios";

const useCustomersFetcher = () => {
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		fetchCustomers();
	}, []);

	const fetchCustomers = async () => {
		try {
			const response = await axios.get(
				"http://localhost:5173/customers/getAllCustomersDetails",
				{
					withCredentials: true,
				}
			);
			setCustomers(response.data);
		} catch (error) {
			console.error("Error fetching customers:", error);
		}
	};

	return customers;
};

export default useCustomersFetcher;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const useCustomersFetcher = () => {
// 	const [customers, setCustomers] = useState(null);

// 	useEffect(() => {
// 		const fetchCustomers = async () => {
// 			try {
// 				console.log("Fetching customers...");
// 				const response = await axios.get(
// 					"http://localhost:5173/customers/getAllCustomersDetails",
// 					{
// 						withCredentials: true,
// 					}
// 				);
// 				console.log("Customers fetched:", response.data);
// 				setCustomers(response.data);
// 			} catch (error) {
// 				console.error("Error fetching customers:", error);
// 			}
// 		};

// 		fetchCustomers();
// 	}, []);

// 	console.log("Customers:", customers);

// 	return customers;
// };

// export default useCustomersFetcher;
