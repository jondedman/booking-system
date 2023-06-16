const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000; // Set the port number for the server

// Middleware to parse JSON data in request bodies
app.use(express.json());

// Start the server
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
