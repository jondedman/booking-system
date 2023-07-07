import React, { useState } from "react";
import Axios from "axios";

const RegistrationForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const handleRegister = () => {
		Axios.post("http://localhost:5173/users/register", {
			username,
			password,
			email,
		})
			.then((res) => console.log(res))
			.catch((error) => console.error(error));
	};

	return (
		<div>
			<h1>Register</h1>
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<button onClick={handleRegister}>Submit</button>
		</div>
	);
};

export default RegistrationForm;
