const { Sequelize } = require("sequelize");

describe("Database Connection", () => {
	it("should successfully connect to the database", async () => {
		const sequelize = new Sequelize("rdadb", "jondedman", null, {
			host: "127.0.0.1",
			port: 5432,
			dialect: "postgres",
		});

		try {
			await sequelize.authenticate();
			console.log("Database connection has been established successfully.");
		} catch (error) {
			console.error("Unable to connect to the database:", error);
		}

		// You can add more assertions or expectations to validate the connection if needed
		expect(sequelize.options.dialect).toBe("postgres");
	});
});
