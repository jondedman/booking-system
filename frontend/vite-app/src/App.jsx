import UserComponent from "./components/UserComponent";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import {
	GetUserButton,
	UserGreeting,
	LogoutButton,
} from "./components/UserSection";
import "./index.css";

function App() {
	const { data, error, register, login, getUser, logout } = UserComponent();

	return (
		<div id="login-form">
			<RegistrationForm onRegister={register} />
			<LoginForm onLogin={login} />
			{/*<GetUserButton onGetUser={getUser} />
			{/* Pass data as a prop */}
			{data && <UserGreeting username={data.username} />}
			<LogoutButton onLogout={logout} />
			{/*{error && <p className="error-message">{error}</p>}*/}
		</div>
	);
}

export default App;

// workin code above

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UserComponent from "./components/UserComponent";
// import RegistrationForm from "./components/RegistrationForm";
// import LoginForm from "./components/LoginForm";
// import {
// 	GetUserButton,
// 	UserGreeting,
// 	LogoutButton,
// } from "./components/UserSection";

// function App() {
// 	const { data, error, register, login, getUser, logout } = UserComponent();
// 	const navigate = useNavigate();
// 	const [isRedirecting, setRedirecting] = useState(false);

// 	const handleLogin = async () => {
// 		await login();
// 		setRedirecting(true);
// 	};

// 	// Redirect to dashboard if user is logged in and redirecting is true
// 	if (data && isRedirecting) {
// 		navigate("/dashboard");
// 	}

// 	return (
// 		<div className="App">
// 			<RegistrationForm onRegister={register} />
// 			<LoginForm onLogin={handleLogin} />{" "}
// 			{/* Use handleLogin instead of login */}
// 			<GetUserButton onGetUser={getUser} />
// 			{/* Pass data as a prop */}
// 			{data && <UserGreeting username={data.username} />}
// 			<LogoutButton onLogout={logout} />
// 			{error && <p className="error-message">{error}</p>}
// 		</div>
// 	);
// }

// export default App;
