import React from "react";

import styles from './Header.module.css';

const Header = ({
    title,
    subtitle
}) => {
    return (
        <header className={styles.header}>
            <div className={styles.headingBorderTop}></div>
            <h1>{title}</h1>
            <div className={styles.headingBorderBottom}></div>
            {
                subtitle && (
                    <h2>{subtitle}</h2>
                )
            }
        </header>
    )
}

export default Header;