import { useState } from "react";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// const navigate = useNavigate();

	const handleLogin = () => {
		onLogin(username, password);
		// navigate("/dashboard"); // Navigate to /dashboard after successful login
	};

	return (
		<div>
			<h1>Login</h1>
			<input
				placeholder="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				placeholder="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleLogin}>Submit</button>
		</div>
	);
};

LoginForm.propTypes = {
	onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
