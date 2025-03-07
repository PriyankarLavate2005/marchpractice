import React, { useState } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="App">  
      {isLogin ? (
        <Login switchToSignup={() => setIsLogin(false)} />
      ) : (
        <Signup switchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default App;