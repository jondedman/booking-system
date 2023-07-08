// not currently used. perhaps after further refactoring
import PropTypes from "prop-types";

const GetUserButton = ({ onGetUser, data }) => {
	const handleGetUser = () => {
		onGetUser(data);
	};

	return (
		<div>
			<h1>Get User</h1>
			<button onClick={handleGetUser}>Submit</button>
		</div>
	);
};

GetUserButton.propTypes = {
	onGetUser: PropTypes.func.isRequired,
	data: PropTypes.object, // Update the prop type according to the shape of the `data` object
};

const UserGreeting = ({ username }) => {
	return <h1>Welcome Back {username}</h1>;
};

UserGreeting.propTypes = {
	username: PropTypes.string.isRequired,
};

const LogoutButton = ({ onLogout }) => {
	return (
		<div>
			<button onClick={onLogout}>Logout</button>
		</div>
	);
};

LogoutButton.propTypes = {
	onLogout: PropTypes.func.isRequired,
};

export { GetUserButton, UserGreeting, LogoutButton };
