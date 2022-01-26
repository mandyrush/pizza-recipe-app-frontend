import React from "react";
import { useState, useEffect } from 'react';

import { CapitalizeFirstLetter } from "../helpers";

import styles from './RatingFields.module.css';

const RatingFields = ({
    category,
    index,
    updateRatings,
    recipeId
}) => {
    const [score, setScore] = useState(null);
    const [comments, setComments] = useState('');

    let rating = {
        recipe_id: Number(recipeId),
        rating_category_id: Number(category.id),
        score: score,
        comments: comments
    }

    useEffect(() => {
        updateRatings(rating);
    }, [score, comments])

    return (
        <div className={styles.ratingFieldsSection}>
            <h2>{CapitalizeFirstLetter(category.name)}</h2>
            <label htmlFor={`score-${index}`}>Rating</label>
            <input
                type="number"
                id={`score-${index}`}
                name={`score-${index}`}
                placeholder="0 - 50"
                onChange={(e) => setScore(e.target.value)}
            />
            <label htmlFor={`comments-${index}`}>Comments</label>
            <textarea
                rows="3"
                maxLength="300"
                id={`comments-${index}`}
                name={`comments-${index}`}
                onChange={(e) => setComments(e.target.value)}
            />
        </div>
    )
}

export default RatingFields;