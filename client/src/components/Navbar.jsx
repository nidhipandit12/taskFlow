import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/dashboard" className="navbar-brand">
                TaskFlow
            </Link>

            <div className="navbar-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/projects">Projects</Link>
            </div>

            <div className="navbar-user">
                <span>Hi, {user?.name}</span>
                <button onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;