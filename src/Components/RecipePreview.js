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
            <div className={styles.recipePreviewHeader}>
                {recipe.name && <h2>{recipe.name}</h2>}
            </div>
            <h2>Notes</h2>
            {recipe.notes && <p>{recipe.notes}</p>}
            <h2>Ingredients</h2>
            {ingredients &&
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.quantity} {ingredient.name} - {ingredient.notes}
                            <button onClick={(e) => handleDeleteIngredient(e, ingredient)}>Delete</button>
                        </li>
                    ))}
                </ul>
            }
            <h2>Steps</h2>
            {steps &&
                <ul>
                    {steps.map((step, index) => (
                        <li key={index}>
                            {step.step}
                            <button onClick={(e) => handleDeleteStep(e, step.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            }
            {/* <h2>Gallery</h2> */}
        </div>
    )
}

export default RecipePreview;