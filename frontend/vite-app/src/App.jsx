import React from "react";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";

function App() {
	return (
		<div className="App">
			<RegistrationForm />
			<LoginForm />
			<UserInfo />
		</div>
	);
}

export default App;
