import React from "react";
import { Link } from "react-router-dom";
import UserComponent from "./UserComponent";
import BookingsFetcher from "./BookingsFetcher";
import BigCalendar from "./BigCalendar";

export default function Dashboard() {
	const { logout } = UserComponent();

	const handleLogout = () => {
		logout();
	};

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
							<Link to={`contacts/1`}>other link</Link>
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
				<BigCalendar bookings={BookingsFetcher()} />
			</div>
		</>
	);
}
