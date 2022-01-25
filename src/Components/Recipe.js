import React from "react";
import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from "react-router-dom";
import { getToken } from "../helpers";

import styles from './Recipe.module.css';
import Header from './Header';
import RatingCard from './RatingCard';

const INGREDIENT_API = 'https://pizza-recipe-app.herokuapp.com/ingredients';
const STEP_API = 'https://pizza-recipe-app.herokuapp.com/steps';

const Recipe = () => {
    const { projectId, recipeId } = useParams();
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    let location = useLocation();

    // Get Ingredients
    useEffect(() => {
        fetch(INGREDIENT_API + '?recipe=' + recipeId, {
            headers: {
                'Authorization': `token ${getToken()}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setIngredients(data)
            })
            .catch(error => console.log('Failed to get ingredients: ', error))
    }, [])

    // Get Steps
    useEffect(() => {
        fetch(STEP_API + '?recipe=' + recipeId, {
            headers: {
                'Authorization': `token ${getToken()}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setSteps(data)
            })
            .catch(error => console.log('Failed to get steps: ', error))
    }, [])

    return (
        <main>
            <Header
                title={location.state.project.name}
                subtitle={location.state.recipe.name}
            />
            <div className="container">
                <Link
                    to={`/project/${projectId}`}
                    state={{
                        project: location.state.project
                    }}
                >
                    Back
                </Link>
                <div className={styles.recipeLayout}>
                    <div>
                        <h2>Ingredients</h2>
                        {ingredients.length > 0 && (
                            <ul>
                                {ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient.quantity} {ingredient.name} - {ingredient.notes}</li>
                                ))}
                            </ul>
                        )}
                        <hr />
                        <h2>Steps</h2>
                        {steps.length > 0 && (
                            <ul>
                                {steps.map((step, index) => (
                                    <li key={index}>{step.step}</li>
                                ))}
                            </ul>
                        )}
                        <hr />
                        <h2>Notes</h2>
                        <p>{location.state.recipe.notes}</p>
                        {/* <hr /> */}
                        {/* <h2>Gallery</h2> */}
                    </div>
                    <div className={styles.ratings}>
                        <h2>Ratings</h2>

                        {location.state.ratings.length > 0 &&
                            (
                                <div>
                                    <p>Score - {location.state.averageRatings}</p>
                                    {
                                        location.state.ratings.map((rating, index) => (
                                            <RatingCard key={index} rating={rating} averageRatings={location.state.averageRatings} />))
                                    }
                                </div>
                            )
                        }
                        {
                            location.state.ratings.length === 0 &&
                            <Link
                                to={`/project/${projectId}/recipe/${recipeId}/rate`}
                                state={{
                                    project: location.state.project,
                                    recipe: location.state.recipe
                                }}
                            >
                                Rate
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Recipe;