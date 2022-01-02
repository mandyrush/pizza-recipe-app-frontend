import React from "react";
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
    return (
        <div className={styles.navbar}>
            <h1>Pizza Recipe App</h1>
            <nav>
                <Link to="/" className={styles.navLink}>Home</Link>
                <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
                <Link to="logout" className={styles.navLink}>Logout</Link>
            </nav>
        </div>
    );
}

export default Navigation;