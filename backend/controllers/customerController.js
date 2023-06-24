const { sequelize } = require("../models/index");
const { Customer } = sequelize.models;

// Controller methods
exports.getAllCustomers = async (req, res) => {
	console.log("getAllCustomers1");
	try {
		console.log("getAllCustomers2");
		const customers = await Customer.findAll();
		console.log(customers);

		// Test code for accessing a specific customer
		const cust = await Customer.findOne({ where: { id: 1157 } });
		console.log("Test customer:");
		console.log(cust);

		res.json(customers);
	} catch (error) {
		// console.log("Error in getAllCustomers:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.getCustomerById = async (req, res) => {
	const { id } = req.params;
	try {
		console.log("getCustomerById:", id);
		const customer = await Customer.findByPk(id);
		console.log("Customer:", customer);
		if (!customer) {
			return res.status(404).json({ error: "Customer not found" });
		}
		res.json(customer);
	} catch (error) {
		console.log("Error in getCustomerById:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.createCustomer = async (req, res) => {
	// Retrieve customer data from request body
	const { name, email } = req.body;

	try {
		console.log("Create customer:", name, email);
		const customer = await Customer.create({ name, email });
		res.status(201).json(customer);
	} catch (error) {
		console.log("Error in createCustomer:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.updateCustomer = async (req, res) => {
	const { id } = req.params;

	// Retrieve updated customer data from request body
	const { name, email } = req.body;

	try {
		console.log("Update customer:", id, name, email);
		const customer = await Customer.findByPk(id);
		if (!customer) {
			return res.status(404).json({ error: "Customer not found" });
		}
		await customer.update({ name, email });
		res.json(customer);
	} catch (error) {
		console.log("Error in updateCustomer:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.deleteCustomer = async (req, res) => {
	const { id } = req.params;

	try {
		console.log("Delete customer:", id);
		const customer = await Customer.findByPk(id);
		if (!customer) {
			return res.status(404).json({ error: "Customer not found" });
		}
		await customer.destroy();
		res.json({ message: "Customer deleted successfully" });
	} catch (error) {
		console.log("Error in deleteCustomer:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
