const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./Modals/DB');
const userRoutes = require('./Router/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Database Connection
connectDB();

// Routes
app.use('/', userRoutes); // Prefix all user routes with /api

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port myport ${PORT}`);
});