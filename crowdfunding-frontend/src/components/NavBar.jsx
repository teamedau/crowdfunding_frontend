import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import "./LayoutTemplate.css";
import logo from "../assets/logo.png";

function NavBar() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user_id");
        window.localStorage.removeItem("username");
        setAuth({ token: null, user_id: null, username: null });
        setIsMenuOpen(false);
        navigate("/");
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    <img src={logo} alt="twogether logo" />
                </Link>

        
                <button 
                    className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

        
                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link" onClick={closeMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/about" className="navbar-link" onClick={closeMenu}>
                            About
                        </Link>
                    </li>
                    {auth.token ? (
                        <>
                            <li className="navbar-item">
                                <Link to="/dashboard" className="navbar-link" onClick={closeMenu}>
                                    Dashboard
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/new-fundraiser" className="navbar-link" onClick={closeMenu}>
                                    New Fundraiser
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <button onClick={handleLogout} className="navbar-button navbar-button--logout">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="navbar-item">
                                <Link to="/login" className="navbar-link" onClick={closeMenu}>
                                    Login
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/register" className="navbar-button" onClick={closeMenu}>
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
