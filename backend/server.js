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
console.log("Hello World");
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
		logging: (msg) => console.log(`[Sequelize]: ${msg}`),
	}
);
console.log(config);

// Define your User model using Sequelize if it's not already defined

// ...

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "http://localhost:5174",
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
		console.log("LocalStrategy is called");
		try {
			const user = await User.findOne({
				where: { username },
				raw: true, // Add the raw option to get the raw data object
			});
			console.log(user);
			if (!user) {
				return done(null, false, { message: "No User Exists" });
			}
			// const isPasswordValid = await bcrypt.compare(password, user.password);
			// if (!isPasswordValid) {
			// 	return done(null, false, { message: "Invalid Password" });
			// }
			return done(null, user);
		} catch (error) {
			return done(error);
		}
	})
);

passport.serializeUser(function (user, done) {
	console.log("serializeUser is called");
	console.log(user);
	done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
	console.log("deserializeUser is called");
	try {
		const user = await User.findByPk(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.options("/login", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.sendStatus(200);
});

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
			res.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");
			res.setHeader("Access-Control-Allow-Credentials", "true");
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

		// 	res.send("User Created");
		// } catch (error) {
		// 	console.error(error);
		// 	res.send("Error occurred during user registration");
		// }
		res.send("User Created");
	} catch (error) {
		console.error(error);
		res.status(500).send(error.message); // Send the error message as the response
	}
});

app.get("/user", (req, res) => {
	console.log("user is called");
	res.send(req.user);
	console.log(req.user);
});

sequelize
	.authenticate()
	.then(() => {
		console.log("Database connection has been established successfully.");
	})
	.catch((error) => {
		console.error("Unable to connect to the database:", error);
	});
//----------------------------------------- END OF ROUTES---------------------------------------------------
// Error handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Internal Server Error");
});
// Start Server
app.listen(5173, () => {
	console.log("Server Has Started");
});
