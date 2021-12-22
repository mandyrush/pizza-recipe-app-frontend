import React from "react";
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            <h1>Pizza Recipe App</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/dashboard">Dashboard</Link>
            </nav>
        </div>
    );
}

export default Navigation;