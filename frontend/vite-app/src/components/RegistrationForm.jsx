import { useState } from "react";
import PropTypes from "prop-types";

const RegistrationForm = ({ onRegister }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const handleRegister = () => {
		onRegister(username, password, email);
	};

	return (
		<div>
			<h1>Register</h1>
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
			<input
				placeholder="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<button onClick={handleRegister}>Submit</button>
		</div>
	);
};

RegistrationForm.propTypes = {
	onRegister: PropTypes.func.isRequired,
};

export default RegistrationForm;
