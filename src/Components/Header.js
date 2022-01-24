import React from "react";

import styles from './Header.module.css';

const Header = ({
    title
}) => {
    return (
        <header className={styles.header}>
            <div className={styles.headingBorderTop}></div>
            <h1>{title}</h1>
            <div className={styles.headingBorderBottom}></div>
        </header>
    )
}

export default Header;