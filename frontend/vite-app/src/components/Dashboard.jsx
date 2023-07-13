import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import UserComponent from "./UserComponent";
import BookingsFetcher from "./BookingsFetcher";
import BigCalendar from "./BigCalendar";
import CustomerList from "../routes/CustomerList";

export default function Dashboard() {
	const { logout } = UserComponent();

	const handleLogout = () => {
		logout();
	};

	const bookings = BookingsFetcher(); // Fetch bookings data

	return (
		<>
			<div id="sidebar">
				{/* Sidebar content */}
				<nav>
					<ul>
						{/* Menu items */}
						<li>
							<button>Toggle calendar/booking view component</button>
						</li>
						<li>
							<button>Create Booking component</button>
						</li>
						<li>
							<button>Create customer component</button>
						</li>
						<li>
							<button>View all Customers component</button>
						</li>
						<li>
							<Link to="/dashboard/customerList">Customer List</Link>
						</li>
						<li>
							<Link to={`contacts/2`}>other link</Link>
						</li>
						<li>
							<button onClick={handleLogout}>Logout</button>
						</li>
					</ul>
				</nav>
			</div>
			<div id="detail">
				<Routes>
					<Route path="/" element={<BigCalendar bookings={bookings} />} />
					<Route path="customerList" element={<CustomerList />} />
				</Routes>
			</div>
		</>
	);
}
