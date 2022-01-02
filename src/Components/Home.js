import React from "react";

import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homeLayout}>
            <div className={styles.logo}>
                <h1>Logo</h1>
            </div>
            <div className={styles.login}>
                <form>
                    <h2>Login</h2>
                    <input type="text" name="username" id="username" required />
                    <label htmlFor="username">Username</label>
                    <input type="password" name="password" id="password" required />
                    <label htmlFor="password">Password</label>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Home;