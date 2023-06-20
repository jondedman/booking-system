const { sequelize } = require("../models");
const { Customer } = require("../models");

describe("Customer Model Validations", () => {
	beforeAll(async () => {
		// Authenticate the Sequelize instance and establish a connection
		await sequelize.authenticate();
	});

	afterAll(async () => {
		// Close the database connection
		await sequelize.close();
	});

	// const seed = require("/Users/jondedman/code/jondedman/booking-system/backend/seeders/20230616110044-test-seed.js");

	// beforeEach(async () => {
	// 	// Run the seed file to reset the database with test data
	// 	await seed.up();
	// });

	test("should require firstName field", async () => {
		try {
			// Create a customer without a firstName
			await Customer.create({
				lastName: "Dedman",
				email: "jon@example.com",
				mobileNumber: "1234567892",
				address: "123 Street, City",
				postcode: "AB1 2CD",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
		}
	});

	test("should require firstName field to be non-empty", async () => {
		try {
			await Customer.create({
				firstName: "",
				lastName: "Doe",
				email: "test@example.com",
				mobileNumber: "1234567890",
				address: "123 Street, City",
				postcode: "AB1 2CD",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe(
				"Validation notEmpty on firstName failed"
			);
		}
	});

	test("should require lastName field", async () => {
		try {
			// Create a customer without a lastName
			const cust = await Customer.create({
				firstName: "James",
				email: "test@example.com",
				mobileNumber: "1234567890",
				address: "123 Road, City",
				postcode: "AB2 4CD",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
		}
	});

	test("should require lastName field to be non-empty", async () => {
		try {
			await Customer.create({
				firstName: "John",
				lastName: "",
				email: "test@example.com",
				mobileNumber: "1234567890",
				address: "123 Street, City",
				postcode: "AB1 2CD",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe(
				"Validation notEmpty on lastName failed"
			);
		}
	});

	test("should require email field", async () => {
		try {
			// Create a customer without an email
			await Customer.create({
				firstName: "Farrah",
				lastName: "Burchett",
				mobileNumber: "1234567899",
				address: "12 Street, City",
				postcode: "AB3 2CD",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
		}
	});

	test("should require email field to be non-empty", async () => {
		try {
			await Customer.create({
				firstName: "james",
				lastName: "Does",
				email: "",
				mobileNumber: "1234567890",
				address: "123 Street, City",
				postcode: "AB1 2CD",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe(
				"Validation notEmpty on email failed"
			);
		}
	});

	test("should require email field to be a valid email", async () => {
		try {
			await Customer.create({
				firstName: "John",
				lastName: "Doe",
				email: "test",
				mobileNumber: "1234567890",
				address: "123 Street, City",
				postcode: "AB1 2CD",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe(
				"Validation isEmail on email failed"
			);
		}
	});

	test("should require email field to be unique", async () => {
		try {
			// Create a customer with an existing email
			await Customer.create({
				firstName: "John",
				lastName: "Doe",
				email: "test@example.com", // Existing email
				mobileNumber: "1234567890",
				address: "123 Street, City",
				postcode: "AB1 2CD",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
		}
	});

	test("should require mobileNumber field", async () => {
		try {
			// Create a customer without a mobileNumber
			await Customer.create({
				firstName: "Jim",
				lastName: "bon",
				email: "jom@example.com",
				address: "123 Street, City",
				postcode: "AB1 2DD",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
		}
	});

	test("should require mobileNumber field to be non-empty", async () => {
		try {
			await Customer.create({
				firstName: "John",
				lastName: "deen",
				email: "kjhlkjhl@email.com",
				mobileNumber: "",
				address: "3 Road, City",
				postcode: "AB1 6CD",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe(
				"Validation notEmpty on mobileNumber failed"
			);
		}
	});

	test("should require address field", async () => {
		try {
			// Create a customer without an address
			await Customer.create({
				firstName: "John",
				lastName: "Doe",
				email: "test@example.com",
				mobileNumber: "1234567890",
				postcode: "AB1 2ED",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
		}
	});

	test("should require address field to be non-empty", async () => {
		try {
			await Customer.create({
				firstName: "John",
				lastName: "Doe",
				email: "tesed@sfasdf.com",
				mobileNumber: "123467890",
				address: "",
				postcode: "po2 2CD",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe(
				"Validation notEmpty on address failed"
			);
		}
	});

	test("should require postcode field", async () => {
		try {
			// Create a customer without a postcode
			await Customer.create({
				firstName: "tit",
				lastName: "bo",
				email: "sdsd@test.com",
				mobileNumber: "1234567890",
				address: "13 Road, City",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
		}
	});

	test("should require postcode field to be non-empty", async () => {
		try {
			// Create a customer with an empty postcode
			await Customer.create({
				firstName: "asdf",
				lastName: "peep",
				email: "afasdf@kjhkjh.com",
				mobileNumber: "9876543210",
				address: "34 fri road",
				postcode: "",
				notes: "etst notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.errors[0].message).toBe(
				"Validation notEmpty on postcode failed"
			);
		}
	});

	console.log("should require userId field");
	test("should belong to a user", async () => {
		try {
			// Create a customer without setting the userId
			const customer = await Customer.create({
				firstName: "Billy",
				lastName: "nomates",
				address: "456 Street, City",
				postcode: "AB1 2CD",
				email: "hellotest@example.com",
				mobileNumber: "1234567890",
				dateAdded: new Date(),
			});
			expect(customer.userId).toBeNull();
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
			expect(error.message).toContain(
				'null value in column "userId" of relation "Customers" violates not-null constraint'
			);
		}
	});

	test("should require the combination of firstName, lastName, and postcode to be unique", async () => {
		try {
			// Create a customer with an existing combination of firstName, lastName, and postcode
			await Customer.create({
				firstName: "John",
				lastName: "Doe",
				email: "john.doe@example.com",
				mobileNumber: "1234567890",
				address: "123 Street, City",
				postcode: "AB1 2CD",
				notes: "test notes",
			});
		} catch (error) {
			expect(error.name).toBe("SequelizeDatabaseError");
		}
	});
});
