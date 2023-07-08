const { User } = require("./models");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
	passport.use(
		new LocalStrategy(async function (username, password, done) {
			try {
				const user = await User.findOne({
					where: { username },
					raw: true,
				});
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
};
