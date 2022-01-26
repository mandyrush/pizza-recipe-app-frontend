import React from "react";

import styles from './Header.module.css';

const Header = ({
    title,
    subtitle
}) => {
    return (
        <header className={styles.header}>
            <div className={styles.headingBorderTop}></div>
            <h1>
                {title}
                <br></br>
                {
                    subtitle && (
                        <small>{subtitle}</small>
                    )
                }
            </h1>
            <div className={styles.headingBorderBottom}></div>

        </header>
    )
}

export default Header;