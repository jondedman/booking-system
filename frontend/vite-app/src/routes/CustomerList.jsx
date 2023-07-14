// import React from "react";
// import PropTypes from "prop-types";
// import useCustomersFetcher from "../components/CustomersFetcher";

// const CustomerList = () => {
// 	const customers = useCustomersFetcher();
// 	console.log(customers);
// 	// the display below is to test access to the data. Full details will be linked to show page
// 	return (
// 		<div>
// 			<h1>Customer List</h1>
// 			{customers.map((customer) => (
// 				<div key={customer.id}>
// 					<h2>
// 						Customer: {customer.firstName} {customer.lastName}{" "}
// 						{customer.mobileNumber} {customer.email}
// 					</h2>
// 					<p>
// 						{customer.Vehicles[0].make} {customer.Vehicles[0].model} Last MOT:{" "}
// 						{customer.Vehicles[0].lastMot} Booking:{" "}
// 						{customer.Vehicles[0].Bookings[0].repair.toString()}{" "}
// 					</p>
// 					<p>
// 						Booking
// 						{customer.Vehicles[0].Bookings[0].quote}{" "}
// 					</p>
// 					{/* Rest of the customer details */}
// 				</div>
// 			))}
// 		</div>
// 	);
// };

// CustomerList.propTypes = {
// 	customers: PropTypes.array.isRequired,
// };

// export default CustomerList;

// code for simple display above

import React from "react";
import PropTypes from "prop-types";
import { useTable } from "react-table";
import useCustomersFetcher from "../components/CustomersFetcher";

const CustomerList = () => {
	const customers = useCustomersFetcher();
	console.log(customers);

	const columns = [
		{
			Header: "Name",
			accessor: "name",
		},
		// Add more columns as needed
	];

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({
		columns,
		data: customers,
	});

	return (
		<div>
			<h1>Customer List</h1>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render("Header")}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

CustomerList.propTypes = {
	customers: PropTypes.array.isRequired,
};

export default CustomerList;
