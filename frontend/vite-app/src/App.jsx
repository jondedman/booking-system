import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [loginUsername, setLoginUsername] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [data, setData] = useState(null);

	const register = () => {
		Axios({
			method: "POST",
			data: {
				username: registerUsername,
				password: registerPassword,
				email: registerEmail,
			},
			withCredentials: true,
			url: "http://localhost:5173/users/register",
		})
			.then((res) => {
				console.log(res);
				// Registration successful, handle success response
			})
			.catch((error) => {
				console.error(error);
				if (
					error.response &&
					error.response.data &&
					error.response.data.errors
				) {
					const validationErrors = error.response.data.errors;
					// Display validation errors to the user
					validationErrors.forEach((err) => {
						window.alert(`${err.field}: ${err.message}`);
					});
				} else {
					window.alert("An error occurred during registration.");
				}
			});
	};

	const login = () => {
		Axios({
			method: "POST",
			data: {
				username: loginUsername,
				password: loginPassword,
			},
			withCredentials: true,
			url: "http://localhost:5173/users/login",
		})
			.then((res) => {
				console.log(res);
				getUser(); // Call getUser after successful login
			})
			.catch((error) => {
				console.error(error);
				if (
					error.response &&
					error.response.data &&
					error.response.data.message
				) {
					console.log("Error message:", error.response.data.message);
					window.alert(error.response.data.message);
				} else {
					window.alert("An error occurred during login. Please try again.");
				}
			});
	};

	const getUser = () => {
		Axios({
			method: "GET",
			withCredentials: true,
			url: "http://localhost:5173/users/user",
		}).then((res) => {
			setData(res.data);
			console.log(res.data);
		});
	};

	useEffect(() => {
		getUser(); // Call getUser when the component mounts
	}, []);

	return (
		<div className="App">
			<div>
				<h1>Register</h1>
				<input
					placeholder="username"
					onChange={(e) => setRegisterUsername(e.target.value)}
				/>
				<input
					placeholder="password"
					onChange={(e) => setRegisterPassword(e.target.value)}
				/>
				<input
					placeholder="email"
					onChange={(e) => setRegisterEmail(e.target.value)}
				/>
				<button onClick={register}>Submit</button>
			</div>

			<div>
				<h1>Login</h1>
				<input
					placeholder="username"
					onChange={(e) => setLoginUsername(e.target.value)}
				/>
				<input
					placeholder="password"
					onChange={(e) => setLoginPassword(e.target.value)}
				/>
				<button onClick={login}>Submit</button>
			</div>

			<div>
				<h1>Get User</h1>
				<button onClick={getUser}>Submit</button>
				{data ? <h1>Welcome Back {data.username}</h1> : null}
			</div>
		</div>
	);
}

export default App;
