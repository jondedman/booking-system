import React, { useState, useEffect } from "react";
import Axios from "axios";

const UserInfo = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		getUser();
	}, []);

	const getUser = () => {
		Axios.get("http://localhost:5173/users/user", { withCredentials: true })
			.then((res) => {
				console.log("Response data:", res.data);
				setUser(res.data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div>
			<h1>Get User</h1>
			<button onClick={getUser}>Submit</button>
			{user && <h1>Welcome Back {user.username}</h1>}
		</div>
	);
};

export default UserInfo;
