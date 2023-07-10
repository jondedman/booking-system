const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const { sequelize } = require("./models");
const passportConfig = require("./passportConfig");

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

// Initialize Passport.js configuration
passportConfig(passport);

// Routes
app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);

// Error Handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Internal Server Error" });
});

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
