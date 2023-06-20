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
				email: "testuser@example.com",
				password: "password123",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe("Username is required");
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
		try {
			// Create a user without an email
			await User.create({
				username: "testuser",
				password: "password123",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe("Email is required");
		}
	});

	test("should require password field", async () => {
		try {
			// Create a user without a password
			await User.create({
				username: "testuser",
				email: "testuser@example.com",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe("Password is required");
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
		try {
			// Create a user with an invalid email format
			await User.create({
				username: "testuser",
				email: "invalidemail",
				password: "password123",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe("Invalid email format");
		}
	});
});

test("should require username field to be non-empty", async () => {
	try {
		// Create a user with an empty username
		await User.create({
			username: "",
			email: "test@example.com",
			password: "password123",
		});
	} catch (error) {
		expect(error.name).toBe("SequelizeValidationError");
		expect(error.errors[0].message).toBe("Username cannot be empty");
	}
});

test("should require email field to be non-empty", async () => {
	try {
		// Create a user with an empty email
		await User.create({
			username: "testuser",
			email: "",
			password: "password123",
		});
	} catch (error) {
		expect(error.name).toBe("SequelizeValidationError");
		expect(error.errors[0].message).toBe("Email cannot be empty");
	}
});

test("should require password field to be non-empty", async () => {
	try {
		// Create a user with an empty password
		await User.create({
			username: "testuser",
			email: "test@example.com",
			password: "",
		});
	} catch (error) {
		expect(error.name).toBe("SequelizeValidationError");
		expect(error.errors[0].message).toBe("Password cannot be empty");
	}
});
