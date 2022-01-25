import React from "react";

import LoginForm from "./LoginForm";

import styles from './Home.module.css';

const Home = () => {
    return (
        <main className={styles.homeLayout}>
            <div className={styles.logo}>
                <h1>Pizza<br></br>Perfect</h1>
            </div>
            <LoginForm />
        </main>
    );
}

export default Home;