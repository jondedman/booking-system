import { useState, useEffect } from "react";
import Axios from "axios";

const UserComponent = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const register = (username, password, email) => {
		Axios.post(
			"http://localhost:5173/users/register",
			{ username, password, email },
			{ withCredentials: true }
		)
			.then((res) => {
				console.log(res);
				// Registration successful, handle success response
				window.alert("Registration successful.");
			})
			.catch((error) => {
				console.error(error);
				if (error.response && error.response.data) {
					const responseData = error.response.data;
					if (responseData.errors) {
						const validationErrors = responseData.errors;
						// Display validation errors to the user
						validationErrors.forEach((err) => {
							window.alert(`${err.field}: ${err.message}`);
						});
					} else if (responseData.message) {
						// Display custom error message
						window.alert(responseData.message);
					} else {
						window.alert("An error occurred during registration.");
					}
				} else {
					window.alert("An error occurred during registration.");
				}
			});
	};

	const login = (username, password) => {
		Axios.post(
			"http://localhost:5173/users/login",
			{ username, password },
			{ withCredentials: true }
		)
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
		Axios.get("http://localhost:5173/users/user", { withCredentials: true })
			.then((res) => {
				setData(res.data);
				setError(null);
			})
			.catch((error) => {
				console.error(error);
				setError("Error while fetching user data.");
			});
	};

	const logout = () => {
		Axios.get("http://localhost:5173/users/logout", { withCredentials: true })
			.then((res) => {
				console.log(res.data);
				window.alert("Logout successful.");
				setData(null);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		getUser(); // Call getUser when the component mounts
	}, []);

	return {
		data,
		error,
		register,
		login,
		getUser,
		logout,
	};
};

export default UserComponent;
