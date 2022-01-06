import React from "react";

import styles from './Rating.module.css';

const Rating = () => {
    return (
        <div>
            <header>
                <h1>Rating</h1>
                <p>Project Name - Version Name</p>
            </header>
            <div className="interior-content">
                Rating Cards
            </div>
        </div>
    )
}

export default Rating;