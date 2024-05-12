// Import required modules
const express = require('express');

// Create an instance of express application
const app = express();

// Define a port number
const PORT = process.env.PORT || 3000;

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
