import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { checkAuth } from "../helpers";

import styles from './Navigation.module.css';

const Navigation = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        document.cookie = `loggedIn=`;
        document.cookie = `token=`;
        document.cookie = `username=`;
        navigate('/');
    }

    return (
        <header className={styles.navbar}>
            <div className="container">
                <nav>
                    <Link to="/" className={styles.navLink}>Home</Link>
                    {checkAuth() && (
                        <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
                    )}
                    {checkAuth() && (
                        <button onClick={(e) => handleLogout(e)} className={styles.navLink}>Logout</button>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navigation;