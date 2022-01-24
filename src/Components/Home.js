import React from "react";

import LoginForm from "./LoginForm";

import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homeLayout}>
            <div className={styles.logo}>
                <h1>Pizza<br></br>Perfect</h1>
            </div>
            <LoginForm />
        </div>
    );
}

export default Home;