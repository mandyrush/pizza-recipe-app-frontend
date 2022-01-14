import React from "react";
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getToken } from "../helpers";

import RatingFields from "./RatingFields";

import styles from './Rating.module.css';

const RATING_CATEGORIES_API = `https://pizza-recipe-app.herokuapp.com/rating-categories`;
const RATINGS_API = `https://pizza-recipe-app.herokuapp.com/ratings`;

const Rate = () => {
    const [ratingCategories, setRatingCategories] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let location = useLocation();
    const { recipeId } = useParams();

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
        setIsLoading(true);
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
                    .then(setIsLoading(false))
                    .catch(error => console.log('Failed to create rating: ', error))
            }
        })
    }

    return (
        <div>
            <header>
                <h1>Rate</h1>
                {/* <p>{location.state.project.name} - {location.state.recipe.name}</p> */}
            </header>
            <div className="interior-content">
                {isLoading && <p>Calculating Rating...</p>}
                <form>
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
                    <button onClick={(e) => handleSubmit(e)}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Rate;