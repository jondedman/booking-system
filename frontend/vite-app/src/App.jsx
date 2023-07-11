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
