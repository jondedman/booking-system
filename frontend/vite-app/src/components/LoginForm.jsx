import React, { useState } from "react";
import Axios from "axios";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		Axios.post("http://localhost:5173/users/login", {
			username,
			password,
		})
			.then((res) => console.log(res))
			.catch((error) => console.error(error));
	};

	return (
		<div>
			<h1>Login</h1>
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
			<button onClick={handleLogin}>Submit</button>
		</div>
	);
};

export default LoginForm;
