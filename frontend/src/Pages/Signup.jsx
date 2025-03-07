
import React, { useState } from "react";
import "./Signup.css"; // Import the CSS file

const Signup = ({ switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      // Log the raw response for debugging
      console.log("Raw Response:", response);

      // Check if the response is OK
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
      }

      // Parse the response as JSON
      const data = await response.json();
      console.log("Response Data:", data);

      if (data.message) {
        alert(data.message);
        console.log(data);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      setError("Failed to process your request. Please try again.");
      console.error("Error during fetch:", err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="logo">
          {/* <img src="/farmer-logo.png" alt="Farmer Logo" /> */}
          <h1>Farmers Market</h1>
        </div>
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="switch-text">
          Already have an account?{" "}
          <button onClick={switchToLogin} className="switch-button">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;