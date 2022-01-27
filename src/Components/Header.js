import React from "react";

import styles from './Header.module.css';

const Header = ({
    title,
    subtitle
}) => {
    return (
        <header className={styles.header}>

            <h1>
                {title}
                <br></br>
                {
                    subtitle && (
                        <small>{subtitle}</small>
                    )
                }
            </h1>
            {/* <img src="/images/backgrounds/interior_header_bkgd.jpg" alt="" /> */}
        </header>
    )
}

export default Header;