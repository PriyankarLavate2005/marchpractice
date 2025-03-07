import React, { useState } from "react";
import "./Login.css"; // Import the CSS file

const Login = ({ switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        console.log(data);
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <img src="/farmer-logo.png" alt="Farmer Logo" />
          <h1>Farmers Market</h1>
        </div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="switch-text">
          Don't have an account?{" "}
          <button onClick={switchToSignup} className="switch-button">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;