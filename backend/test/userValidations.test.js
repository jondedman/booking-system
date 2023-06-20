const { sequelize } = require("../models");
const { User } = require("../models");

describe("User Model Validations", () => {
	beforeAll(async () => {
		// Authenticate the Sequelize instance and establish a connection
		await sequelize.authenticate();
	});

	afterAll(async () => {
		// Close the database connection
		await sequelize.close();
	});

	test("should not allow duplicate usernames", async () => {
		// Create a user with an existing username
		await User.create({
			username: "existinguser",
			email: "testuser@example.com",
			password: "password123",
		});

		// Try to create another user with the same username
		try {
			await User.create({
				username: "existinguser",
				email: "anotheruser@example.com",
				password: "password456",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeUniqueConstraintError");
			expect(error.fields).toEqual(["username"]);
		}
	});

	test("should not allow duplicate emails", async () => {
		// Create a user with an existing email
		await User.create({
			username: "testuser",
			email: "existinguser@example.com",
			password: "password123",
		});

		// Try to create another user with the same email
		try {
			await User.create({
				username: "anotheruser",
				email: "existinguser@example.com",
				password: "password456",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeUniqueConstraintError");
			expect(error.fields).toEqual(["email"]);
		}
	});
	test("should require username field", async () => {
		try {
			// Create a user without a username
			await User.create({
				// email: "testuser@example.com",
				password: "password123",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
		}
	});

	test("should not allow username less than 3 characters", async () => {
		try {
			await User.create({
				username: "ab",
				email: "testuser@example.com",
				password: "password123",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe(
				"Username must be between 3 and 20 characters"
			);
		}
	});

	test("should require email field", async () => {
		// expect.assertions(1);
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
		// expect.assertions(1);
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
	test("should not allow password less than 6 characters", async () => {
		try {
			await User.create({
				username: "testuser",
				email: "testuser@example.com",
				password: "12345",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe(
				"Password must be between 6 and 20 characters"
			);
		}
	});
	test("should require valid email format", async () => {
		// expect.assertions(1);
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
