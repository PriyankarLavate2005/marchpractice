import React, { useState } from "react";

const Signup = ({ switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
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
            body: JSON.stringify({ email, password,name }),
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
    <div className="auth-form">
      <h1>Sign Up</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
         <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={switchToLogin}>Login</button>
      </p>
    </div>
  );
};

export default Signup;