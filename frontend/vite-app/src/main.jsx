// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// // import App from './App.jsx'
// import "./index.css";
// // import Root from "./routes/root";
// import App from "./App";
// import ErrorPage from "./components/ErrorPage";
// import Dashboard from "./components/Dashboard";

// const router = createBrowserRouter([
// 	{
// 		path: "/",
// 		element: <App />,
// 		errorElement: <ErrorPage />,
// 	},
// 	{
// 		path: "/dashboard",
// 		element: <Dashboard />,
// 		errorElement: <ErrorPage />,
// 	},
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
// 	<React.StrictMode>
// 		<RouterProvider router={router} />
// 	</React.StrictMode>
// );

// working code above

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
