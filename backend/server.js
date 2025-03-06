const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const cors = require("cors"); // Import cors


app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection and routes go here
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  });
// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/myyyy', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connected gh successfully done");
    } catch (e) {
        console.log("something went wrong", e);
    }
};
connectDB()

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/signup', async (req, res) => {
    const { email, password,name } = req.body;
  
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    try {
      const newUser = new User({ email, password ,name});
      await newUser.save();
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error: error.message });
    }
  });
  
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email, password });
      if (user) {
        res.json({ message: "Login successful", user });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
