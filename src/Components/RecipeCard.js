import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getToken } from "../helpers";

import RecipeClone from "./RecipeClone";
import styles from './RecipeCard.module.css';

const RATINGS_API = `https://pizza-recipe-app.herokuapp.com/ratings`;

const RecipeCard = ({
    recipe,
    handleDelete,
    project,
    updateAverage,
    highestRating,
    setRecipes,
    recipes
}) => {
    const [ratings, setRatings] = useState([]);
    const [averageRatings, setAverageRatings] = useState(0);

    // Get all of the ratings for this recipe
    useEffect(() => {
        fetch(RATINGS_API + `?recipe=${recipe.id}`, {
            headers: {
                'Authorization': `token ${getToken()}`
            }
        })
            .then(response => response.json())
            .then(data => setRatings(data))
            .catch(error => console.log('Failed to fetch ratings: ', error))
    }, [])

    // Create the ratings score based on the average of all of the ratings from this recipe
    useEffect(() => {
        let ratingsArray = [...ratings];
        let total = 0;
        ratingsArray.forEach(rating => {
            total += Number(rating.score)
        });
        if (total !== 0) {
            let average = total / ratingsArray.length;
            setAverageRatings(average.toFixed(2));
        }
    }, [ratings])

    useEffect(() => {
        setAverageData();
    }, [averageRatings])

    // Pass the average data back to the project
    const setAverageData = () => {
        let data = {
            recipeId: recipe.id,
            average: Number(averageRatings)
        }
        updateAverage(data);
    }

    return (
        <div className={styles.recipeCard}>
            <p>{recipe.name} - {
                averageRatings !== 0 && (
                    <span className={styles.rating}>
                        <em>{averageRatings}</em>
                    </span>
                )
            }
                {
                    averageRatings === 0 && (
                        <Link
                            to={`/project/${project.id}/recipe/${recipe.id}/rate`}
                            state={{
                                recipe: recipe,
                                project: project
                            }}
                            className={styles.rateLink}
                        >
                            Rate
                        </Link>
                    )
                }
            </p>
            <div className={styles.recipeCardButtons}>
                {
                    highestRating && (
                        <RecipeClone
                            recipe={recipe}
                            projectId={project.id}
                            setRecipes={setRecipes}
                            recipes={recipes}
                        />
                    )
                }
                <Link
                    to={`recipe/${recipe.id}`}
                    state={{
                        recipe: recipe,
                        project: project,
                        ratings: ratings,
                        averageRatings: averageRatings
                    }}
                    className="btn-primary btn-sm"
                >
                    <i className="far fa-eye"></i> View
                </Link>
                <Link
                    to={`/project/${project.id}/recipe/update/${recipe.id}`}
                    state={{ recipe: recipe }}
                    className="btn-primary btn-sm"
                >
                    <span className="fas fa-pencil-alt"></span> Edit
                </Link>
                <button onClick={() => handleDelete(recipe.id)} className="btn-primary btn-sm">
                    <span className="fas fa-trash-alt"></span> Delete
                </button>
            </div>
        </div>
    )
}

export default RecipeCard;