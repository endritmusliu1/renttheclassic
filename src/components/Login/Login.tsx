import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginProps {
  setUser: (user: any) => void;
}

const Login = ({ setUser }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      setMessage("Invalid email or password");
      console.error(error);
    }
  };

  return (
    <div className="l-bg">
      <div className="login-panel">
        <div className="login-card">
          <h1>Welcome Back</h1>
          <p>Login to your account</p>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <a href="/signup" style={{ color: "#dbf549" }}>
                Sign Up
              </a>
            </div>
            {message && (
              <div className="status-message error">{message}</div>
            )}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;