import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import postRegister from "../api/post-register";
import { useAuth } from "../hooks/use-auth.js";
import "./LayoutTemplate.css";

function NewUserForm() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [credentials, setCredentials] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
        if (!emailRegex.test(credentials.email)) {
            setError("Please enter a valid email address");
            return;
        }

        // Validate password length
        if (credentials.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        postRegister(credentials)
            .then((response) => {
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("user_id", response.user_id);
                window.localStorage.setItem("username", credentials.username);
                setAuth({
                    token: response.token,
                    user_id: response.user_id,
                    username: credentials.username,
                });

                navigate("/new-fundraiser");
            })
            .catch((error) => {
                console.error("Error registering:", error);
                setError(error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <h2>Create Account</h2>
        
                {error && <div className="error-message">{error}</div>}
        
                <label htmlFor="username"><b>Username</b></label>
                <input
                    type="text"
                    id="username"
                    placeholder="Choose a username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                    />

                <label htmlFor="first_name"><b>First Name</b></label>
                <input
                    type="text"
                    id="first_name"
                    placeholder="Enter your first name"
                    value={credentials.first_name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="last_name"><b>Last Name</b></label>
                <input
                    type="text"
                    id="last_name"
                    placeholder="Enter your last name"
                    value={credentials.last_name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email"><b>Email</b></label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password"><b>Password</b></label>
                <input
                    type="password"
                    id="password"
                    placeholder="Create a password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Create Account</button>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </form>
    );
}

export default NewUserForm;
