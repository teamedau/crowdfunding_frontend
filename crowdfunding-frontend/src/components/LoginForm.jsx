import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postLogin from "../api/post-login";
import {useAuth} from "../hooks/use-auth.js";
import { Link } from "react-router-dom";
import "./LayoutTemplate.css";

function LoginForm() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [remember, setRemember] = useState(false);
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
    
        if (credentials.username && credentials.password) {
            postLogin(
                credentials.username,
                credentials.password
            ).then((response) => {
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("user_id", response.user_id);
                window.localStorage.setItem("username", credentials.username);
                setAuth({
                    token: response.token,
                    user_id: response.user_id,
                    username: credentials.username,
                });

                navigate("/dashboard");
            }).catch((error) => {
            setError(error.message || "Login failed. Please check your credentials.");
            });
        }
    };

    const handleCancel = () => {
        setCredentials({
            username: "",
            password: "",
        });
        setRemember(false);
        setError("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <h2>Login to Twogether</h2>
        
                {error && <div className="error-message" style={{color: '#e57373', marginBottom: '1rem'}}>{error}</div>}
        
                <label htmlFor="username"><b>Username</b></label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter Username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password"><b>Password</b></label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>
        
                <label>
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        name="remember"
                    /> Remember me
                </label>

                <p style={{textAlign: 'center', marginTop: '1rem'}}>
                    Don't have an account? <Link to="/register">Create one</Link>
                </p>
            </div>
        </form>
    );
}

export default LoginForm;
