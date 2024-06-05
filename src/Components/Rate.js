import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getToken } from "../helpers";
import {config} from '../Constants';

import RatingFields from "./RatingFields";
import Header from "./Header";

import styles from './Rate.module.css';

const RATING_CATEGORIES_API = `${config.url}/rating-categories`;
const RATINGS_API = `${config.url}/ratings`;

const Rate = () => {
    const [ratingCategories, setRatingCategories] = useState([]);
    const [ratings, setRatings] = useState([]);

    let location = useLocation();
    const navigate = useNavigate();
    const { projectId, recipeId } = useParams();

    // Get rating categories
    useEffect(() => {
        fetch(RATING_CATEGORIES_API, {
            headers: {
                'Authorization': `token ${getToken()}`
            }
        })
            .then(response => response.json())
            .then(data => setRatingCategories(data))
            .catch(error => console.log('Failed to fetch rating categories', error))
    }, [])

    const updateRatings = (newRating) => {
        // See if rating exists
        let foundRating = ratings.findIndex(rating => Number(rating['rating_category_id']) === Number(newRating.rating_category_id));
        // If it does, update it
        if (foundRating !== -1) {
            let updatedRatings = [...ratings];
            updatedRatings[foundRating] = newRating;
            setRatings(updatedRatings);
        } else {
            // If it doesn't, add it
            let updatedRatings = [...ratings, newRating];
            setRatings(updatedRatings);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        ratings.forEach(rating => {
            if (rating.score !== null) {
                fetch(RATINGS_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `token ${getToken()}`
                    },
                    body: JSON.stringify(rating)
                })
                    .then(() => {
                        navigate(`/project/${projectId}`);
                    })
                    .catch(error => console.log('Failed to create rating: ', error))
            }
        })
    }

    return (
        <main>
            <Header title="Rate It" subtitle={`${location.state.project.name} / ${location.state.recipe.name}`} />
            <div className="container">
                <form className={styles.ratingForm}>
                    {
                        ratingCategories.length > 0 && ratingCategories.map((category, index) => (
                            <RatingFields
                                key={index}
                                index={index}
                                category={category}
                                updateRatings={updateRatings}
                                recipeId={recipeId}
                            />
                        ))
                    }
                    <button
                        className="btn-primary"
                        onClick={(e) => handleSubmit(e)}>
                        Submit
                    </button>
                </form>
            </div>
        </main>
    )
}

export default Rate;