"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json");
// console.log("Config:", config);
// console.log("dirname:", __dirname);
const db = {};

let sequelize = new Sequelize(
	config.development.database,
	config.development.username,
	config.development.password,
	{
		...config,
		dialect: "postgres", // Replace 'your_dialect_here' with the actual dialect (e.g., 'mysql', 'postgres')
	}
);

// console.log("Sequelize instance:", sequelize);

// console.log(__dirname);
fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js" &&
			file.indexOf(".test.js") === -1
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
		// console.log(`Model "${model.name}" imported successfully`);
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// console.log("db from index.js:", db);
module.exports = {
	db,
	sequelize,
	Sequelize,
};
