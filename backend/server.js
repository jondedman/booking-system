const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const { sequelize } = require("./models");

const app = express();
const PORT = 5173;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(cookieParser("secretcode"));
app.use(
	session({
		secret: "secretcode",
		resave: true,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/users", userRoutes);

// Start Server
sequelize
	.authenticate()
	.then(() => {
		console.log("Database connection has been established successfully.");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Unable to connect to the database:", error);
	});
