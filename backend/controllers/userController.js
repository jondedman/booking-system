const bcrypt = require("bcryptjs");
const passport = require("passport");
const { User } = require("../models");
const { getMessage } = require("../passportConfig"); // Import the getMessage function from passportConfig

exports.login = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json({ message: info.message }); // Send the error message as JSON
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			res.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");
			res.setHeader("Access-Control-Allow-Credentials", "true");
			res.send("Successfully Authenticated");
		});
	})(req, res, next);
};

exports.register = async (req, res, next) => {
	try {
		const password = req.body.password;

		if (!password || password.length < 8) {
			// Password is blank or too short
			return res
				.status(400)
				.json({ message: "Password must be at least 8 characters long" });
		}

		const hashedPassword = await bcrypt.hash(password, 9);
		const newUser = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		res.json({ message: "User created successfully" });
	} catch (error) {
		if (error.name === "SequelizeValidationError") {
			// Handle validation errors
			const errors = error.errors.map((err) => ({
				field: err.path,
				message: err.message,
			}));
			res.status(400).json({ errors });
		} else {
			console.error(error);
			res.status(500).send("Internal Server Error");
		}
	}
};

exports.getUser = (req, res) => {
	if (!req.user) {
		return res.status(401).json({ error: "User not authenticated" }); // Send error message as JSON
	}
	res.json(req.user); // Send user data as JSON
};
