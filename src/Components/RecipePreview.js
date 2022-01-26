import React from "react";
import styles from './RecipePreview.module.css';

import { getToken } from "../helpers";

const INGREDIENTS_API = `https://pizza-recipe-app.herokuapp.com/ingredients`;
const STEP_API = `https://pizza-recipe-app.herokuapp.com/steps`;

const RecipePreview = ({
    recipe,
    ingredients,
    steps,
    setIngredients,
    setSteps
}) => {

    const handleDeleteIngredient = (e, ingredient) => {
        e.preventDefault();

        fetch(INGREDIENTS_API, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `token ${getToken()}`
            },
            body: JSON.stringify({
                recipe_ingredient_id: ingredient.id,
                ingredient_id: ingredient.ingredient_id
            }),
        })
            .then(response => {
                let newIngredients = [...ingredients];
                newIngredients = newIngredients.filter(i => i.id !== ingredient.id);
                setIngredients(newIngredients);
            })
    }

    const handleDeleteStep = (e, id) => {
        e.preventDefault();

        fetch(`${STEP_API}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `token ${getToken()}`
            }
        })
            .then(response => {
                let newSteps = [...steps];
                newSteps = newSteps.filter(step => step.id !== id);
                setSteps(newSteps);
            })
            .catch(error => console.log('Failed to delete step: ', error))
    }

    return (
        <div className={styles.recipePreview}>
            <header className={styles.recipePreviewHeader}>
                {recipe.name && <h2>{recipe.name}</h2>}
            </header>
            <div className={styles.recipeInfo}>
                <article>
                    <h3>Notes</h3>
                    {recipe.notes && <p>{recipe.notes}</p>}
                </article>
                <article>
                    <h3>Ingredients</h3>
                    {ingredients &&
                        <ul>
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.quantity} {ingredient.name} - {ingredient.notes}
                                    <button
                                        className="btn-icon"
                                        onClick={(e) => handleDeleteIngredient(e, ingredient)}
                                    >
                                        <span className="fas fa-trash-alt"></span>
                                        <span className="sr-only">Delete</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    }
                </article>
                <article>
                    <h3>Steps</h3>
                    {steps &&
                        <ul>
                            {steps.map((step, index) => (
                                <li key={index}>
                                    {step.step}
                                    <button
                                        className="btn-icon"
                                        onClick={(e) => handleDeleteStep(e, step.id)}
                                    >
                                        <span className="fas fa-trash-alt"></span>
                                        <span className="sr-only">Delete</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    }
                </article>
                {/* <h2>Gallery</h2> */}
            </div>
        </div>
    )
}

export default RecipePreview;