const bcrypt = require("bcryptjs");
const passport = require("passport");
const { User } = require("../models");
const passportConfig = require("../passportConfig");

// Initialize Passport.js configuration
passportConfig(passport);

exports.login = (req, res, next) => {
	console.log("login is called");
	passport.authenticate("local", (err, user, info) => {
		console.log("authenticate is called");
		console.log("err:", err);
		console.log("user:", user);
		console.log("info:", info);
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.send("No User Exists");
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			console.log("User session created and stored:", req.user);
			res.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");
			res.setHeader("Access-Control-Allow-Credentials", "true");
			return res.send("Successfully Authenticated");
		});
	})(req, res, next);
};

exports.register = async (req, res, next) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 9);

		const newUser = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		res.send("User Created");
	} catch (error) {
		console.error(error);
		res.status(500).send(error.message);
	}
};

exports.getUser = (req, res) => {
	console.log("user is called");
	res.send(req.user);
	console.log("req.user:", req.user);
};
