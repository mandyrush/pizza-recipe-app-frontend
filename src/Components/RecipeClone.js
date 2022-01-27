import React from "react";

import { getToken } from "../helpers";

const RECIPE_API = 'https://pizza-recipe-app.herokuapp.com/recipes';
const INGREDIENTS_API = `https://pizza-recipe-app.herokuapp.com/ingredients`;
const STEP_API = `https://pizza-recipe-app.herokuapp.com/steps`;

const RecipeClone = ({
    recipe,
    projectId,
    setRecipes,
    recipes
}) => {
    const updateRecipes = (createdRecipeId) => {
        // Update recipes state on project component
        let newRecipe = { ...recipe, id: createdRecipeId, name: `Copy of ${recipe.name}` }
        setRecipes([...recipes, newRecipe])
    }

    const cloneIngredients = (createdRecipeId) => {
        // Get the ingredients from id on recipe to be cloned
        fetch(`${INGREDIENTS_API}?recipe=${recipe.id}`)
            .then(response => response.json())
            .then(data => {
                // Create copies of the ingredients to be cloned
                data.forEach(ingredient => {
                    let ingredientCopy = {
                        name: ingredient['name'],
                        recipe_id: createdRecipeId,
                        quantity: ingredient['quantity'],
                        notes: ingredient['notes']
                    }

                    fetch(INGREDIENTS_API, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `token ${getToken()}`
                        },
                        body: JSON.stringify(ingredientCopy)
                    })
                        .catch(error => console.log('Failed to clone ingredients'))
                });
            })
            .catch(error => console.log('Failed to fetch ingredients: ', error))
    }

    const cloneSteps = (createdRecipeId) => {
        // Get the steps from id of recipe to be cloned
        fetch(`${STEP_API}?recipe=${recipe.id}`)
            .then(response => response.json())
            .then(data => {
                // Create copies of the steps
                data.forEach(step => {
                    let stepCopy = {
                        step: step['step'],
                        recipe_id: createdRecipeId,
                        step_order: step['step_order']
                    }

                    fetch(STEP_API, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `token ${getToken()}`
                        },
                        body: JSON.stringify(stepCopy)
                    })
                        .catch(error => console.log('Failed to clone steps'))
                });
            })
            .catch(error => console.log('Failed to fetch steps: ', error))
    }

    const handleClone = () => {
        let newRecipe = {
            name: `Copy of ${recipe.name}`,
            notes: recipe.notes,
            project_id: projectId
        }

        // Create a new recipe with the values from recipe to be cloned
        fetch(RECIPE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `token ${getToken()}`
            },
            body: JSON.stringify(newRecipe),
        })
            .then(response => response.json())
            .then(data => {
                let createdRecipeId = data['insertId'];

                updateRecipes(createdRecipeId);

                cloneIngredients(createdRecipeId);

                cloneSteps(createdRecipeId);
            })
            .catch(error => console.log('Error: ', error))
    }

    return (
        <button onClick={handleClone} className="btn-outline btn-sm">
            <span className="far fa-clone"></span> Clone
        </button>
    )
}

export default RecipeClone;