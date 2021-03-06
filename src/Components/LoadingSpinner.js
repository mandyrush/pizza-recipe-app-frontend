import React from "react";
import styles from './LoadingSpinner.module.css';

const loadingSpinner = ({
    message
}) => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.shadow}>
                <div className={styles.crust}>
                    <div className={styles.pizza}>
                        <span className={`${styles.cheese} ${styles.cheeseOne}`}></span>
                        <span className={`${styles.cheese} ${styles.cheeseTwo}`}></span>
                        <span className={`${styles.cheese} ${styles.cheeseThree}`}></span>
                        <span className={`${styles.basil} ${styles.basilOne}`}></span>
                        <span className={`${styles.basil} ${styles.basilTwo}`}></span>
                        <span className={`${styles.basil} ${styles.basilThree}`}></span>
                    </div>
                </div>
            </div>
            <p className={styles.message}>{message}</p>
        </div>
    )
}

export default loadingSpinner;