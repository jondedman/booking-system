import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Routes,
	Outlet,
	Link,
} from "react-router-dom";
import App from "./routes/App";
import "./index.css";
import Dashboard from "./components/Dashboard";
import ErrorPage from "./components/ErrorPage";
import CustomerList from "./routes/CustomerList";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard/*",
		element: <Dashboard />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "customerList",
				element: <CustomerList />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
