import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);
        setLoading(true);
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/register",
                {
                    name,
                    email,
                    password
                }
            );
            setMessage("Account created successfully!");
            setIsError(false);
            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (error: any) {
            setIsError(true);
            const apiError = error.response?.data?.message || "Signup failed. Please try again.";
            setMessage(apiError);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="s-bg">
            <div className="signup-panel">
                <div className="signup-card">
                    <h1>Create Account</h1>
                    <p>Register your account</p>
                    <form onSubmit={handleSignup}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
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
                        <div className="login-prompt">
                            Already have an account?{" "}
                            <Link to="/login" className="login-link">
                                Login
                            </Link>
                        </div>
                        {message && (
                            <div className={`status-message ${isError ? "error" : "success"}`}>
                                {message}
                            </div>
                        )}
                        <button type="submit" disabled={loading}>
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;