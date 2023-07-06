const { User } = require("./models");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
	passport.use(
		new LocalStrategy(async function (username, password, done) {
			console.log("LocalStrategy is called");
			console.log(username, password);
			try {
				const user = await User.findOne({
					where: { username },
					raw: true,
				});
				console.log(user);
				if (!user) {
					return done(null, false, { message: "No User Exists" });
				}
				const isPasswordValid = await bcrypt.compare(password, user.password);
				console.log("compare password");
				console.log(isPasswordValid);
				if (!isPasswordValid) {
					console.log(password, user.password);
					console.log("Invalid Password");
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
};
