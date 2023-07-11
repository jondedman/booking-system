import { Outlet, Link } from "react-router-dom";
import "../index.css";
import UserComponent from "./UserComponent";
import BookingList from "./BookingListContainer";

export default function Dashboard() {
	const { logout } = UserComponent();

	const handleLogout = () => {
		logout();
	};
	// search bar will need adapting or removing as react table has its own search bar
	return (
		<>
			<div id="sidebar">
				<div>
					<form id="search-form" role="search">
						<input
							id="q"
							aria-label="Search contacts"
							placeholder="Search"
							type="search"
							name="q"
						/>
						<div id="search-spinner" aria-hidden hidden={true} />
						<div className="sr-only" aria-live="polite"></div>
					</form>
					<form method="post">{/* <button type="submit">New</button> */}</form>
				</div>
				<nav>
					<ul>
						<li>
							<button>Toggle calender/booking view component</button>
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
				<BookingList />
				<Outlet />
			</div>
		</>
	);
}
