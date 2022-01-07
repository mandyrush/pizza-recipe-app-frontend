import React from "react";
import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from "react-router-dom";

import styles from './Recipe.module.css';

import RatingCard from './RatingCard';

const INGREDIENT_API = 'https://pizza-recipe-app.herokuapp.com/ingredients';
const STEP_API = 'https://pizza-recipe-app.herokuapp.com/steps';

const Recipe = () => {
    const { projectId, recipeId } = useParams();
    const [project, setProject] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [averageRatings, setAverageRatings] = useState(0);

    let location = useLocation();

    // Save Recipe 
    useEffect(() => {
        setRecipe(location.state.recipe);
        setProject(location.state.project);
        setRatings(location.state.ratings);
        setAverageRatings(location.state.averageRatings);
    }, [])

    // Get Ingredients
    useEffect(() => {
        fetch(INGREDIENT_API + '?recipe=' + recipeId)
            .then(response => response.json())
            .then(data => {
                setIngredients(data)
            })
            .catch(error => console.log('Failed to get ingredients: ', error))
    }, [recipe])

    // Get Steps
    useEffect(() => {
        fetch(STEP_API + '?recipe=' + recipeId)
            .then(response => response.json())
            .then(data => {
                setSteps(data)
            })
            .catch(error => console.log('Failed to get steps: ', error))
    }, [recipe])

    return (
        <div>
            <header>
                <h1>{project.name}</h1>
                <h2>{recipe.name}</h2>
            </header>
            <Link
                to={`/project/${projectId}`}
                state={{
                    project: project
                }}
            >
                Back
            </Link>
            <div className="interior-content">
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
                        <p>{recipe.notes}</p>
                        <hr />
                        <h2>Gallery</h2>
                    </div>
                    <div className={styles.ratings}>
                        <h2>Ratings</h2>

                        {ratings.length > 0 &&
                            (
                                <div>
                                    <p>Score - {averageRatings}</p>
                                    {
                                        ratings.map((rating, index) => (
                                            <RatingCard key={index} rating={rating} averageRatings={averageRatings} />))
                                    }
                                </div>
                            )
                        }
                        {
                            ratings.length === 0 &&
                            <Link to={`/recipe/${recipe.id}/rate`}>Rate</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recipe;