import React from "react";
import styles from './RatingCard.module.css';

import { CapitalizeFirstLetter } from "../helpers";

const RatingCard = ({ rating }) => {
    return (
        <article className={styles.ratingCard}>
            <h3>{CapitalizeFirstLetter(rating.name)} - {rating.score} / 50</h3>
            <p>{rating.comments}</p>
        </article>
    )
}

export default RatingCard;