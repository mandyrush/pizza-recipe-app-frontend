import React from "react";
import { useState } from "react";
import styles from './RecipeForm.module.css';

import { getToken } from "../helpers";
import {config} from '../Constants';
import LoadingSpinner from "./LoadingSpinner";

const RECIPE_API = `${config.url}/recipes`;

const RecipeForm = ({
    recipe,
    setRecipe,
    setNewRecipeId,
    type,
    setRecipeManagerIsVisible,
    setIngredientFormIsVisible
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);

        if (type === 'create') {
            fetch(RECIPE_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `token ${getToken()}`
                },
                body: JSON.stringify(recipe),
            })
                .then(response => response.json())
                .then((data) => {
                    setIsLoading(false);
                    setNewRecipeId(data['insertId']);
                    setRecipeManagerIsVisible(false);
                    setIngredientFormIsVisible(true);
                })
                .catch(error => console.log('Error: ', error))
        } else {
            fetch(`${RECIPE_API}/${recipe.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `token ${getToken()}`
                },
                body: JSON.stringify(recipe),
            })
                .then(() => {
                    setIsLoading(false);
                    setRecipeManagerIsVisible(false);
                    setIngredientFormIsVisible(true);
                })
                .catch(error => console.log('Error: ', error))
        }
    }

    return (
        <div className={styles.recipeForm}>
            <form>
                <h2>Notes</h2>
                <label htmlFor="name">Version Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={recipe.name}
                    onChange={(event) => setRecipe({ ...recipe, name: event.target.value })}
                />
                <label htmlFor="notes">Notes</label>
                <textarea
                    name="notes"
                    id="notes"
                    value={recipe.notes}
                    onChange={(event) => setRecipe({ ...recipe, notes: event.target.value })}
                    rows="3"
                />
                <button
                    type="button"
                    className="btn-primary"
                    onClick={handleSubmit}
                >
                    Next
                </button>
            </form>
            {isLoading && (
                <LoadingSpinner
                    message={type === 'create' ? 'Creating...' : 'Updating...'}
                />
            )}
        </div>
    )
}

export default RecipeForm;