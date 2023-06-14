const { User } = require("../models");

describe("User Model Validations", () => {
	test("should not allow duplicate usernames", async () => {
		expect.assertions(1);
		try {
			// Create a user with an existing username
			await User.create({
				username: "existinguser",
				email: "testuser@example.com",
				password: "password123",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeUniqueConstraintError");
		}
	});

	test("should not allow duplicate emails", async () => {
		expect.assertions(1);
		try {
			// Create a user with an existing email
			await User.create({
				username: "testuser",
				email: "existinguser@example.com",
				password: "password123",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeUniqueConstraintError");
		}
	});

	test("should require username field", async () => {
		try {
			// Create a user without a username
			await User.create({
				email: "testuser@example.com",
				password: "password123",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
		}
	});

	test("should require email field", async () => {
		expect.assertions(1);
		try {
			// Create a user without an email
			await User.create({
				username: "testuser",
				password: "password123",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
		}
	});

	test("should require password field", async () => {
		expect.assertions(1);
		try {
			// Create a user without a password
			await User.create({
				username: "testuser",
				email: "testuser@example.com",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
		}
	});

	test("should require valid email format", async () => {
		expect.assertions(1);
		try {
			// Create a user with an invalid email format
			await User.create({
				username: "testuser",
				email: "invalidemail",
				password: "password123",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
		}
	});
});
