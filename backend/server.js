// commented out code is for testing customerController.js and can be integrated once authentication is implemented
// const express = require("express");
// const Quote = require("inspirational-quotes");
// const app = express();
// const customerRouter = require("./routes/customerRoutes");

// app.use(function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); // Update with your frontend URL
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept"
// 	);
// 	next();
// });

// app.use("/customers", customerRouter);
// app.get("/", function (req, res) {
// 	res.send(Quote.getQuote());
// });

// let port = process.env.PORT;
// if (port == null || port == "") {
// 	port = 8080;
// }

// app.listen(port, function () {
// 	console.log("Server started successfully");
// });
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const { User } = require("./models"); // Assuming your User model is exported as 'User' in your models directory
const db = require("./models");
const { Sequelize } = require("sequelize");
const config = require("./config/config.json")["development"];
//----------------------------------------- END OF IMPORTS---------------------------------------------------

// Modify the Sequelize and PostgreSQL connection configuration according to your setup
const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: config.host,
		port: config.port,
		dialect: config.dialect,
	}
);

// Define your User model using Sequelize if it's not already defined

// ...

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "http://localhost:5173", // <-- location of the React app you're connecting to
		credentials: true,
	})
);
app.use(
	session({
		secret: "secretcode",
		resave: true,
		saveUninitialized: true,
	})
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new LocalStrategy(async function (username, password, done) {
		try {
			const user = await User.findOne({ where: { username } });
			if (!user) {
				return done(null, false, { message: "No User Exists" });
			}
			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return done(null, false, { message: "Invalid Password" });
			}
			return done(null, user);
		} catch (error) {
			return done(error);
		}
	})
);

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
	try {
		const user = await User.findByPk(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
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
			return res.send("Successfully Authenticated");
		});
	})(req, res, next);
});

app.post("/register", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		const newUser = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		res.send("User Created");
	} catch (error) {
		console.error(error);
		res.send("Error occurred during user registration");
	}
});

app.get("/user", (req, res) => {
	res.send(req.user);
});

//----------------------------------------- END OF ROUTES---------------------------------------------------

// Start Server
app.listen(5173, () => {
	console.log("Server Has Started");
});
