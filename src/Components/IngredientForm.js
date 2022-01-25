import React from "react";
import { useState, useEffect } from 'react';
import { getToken } from "../helpers";

const INGREDIENT_API = `https://pizza-recipe-app.herokuapp.com/ingredients`;

const IngredientForm = ({
    handleUpdateIngredients,
    newRecipeId,
    recipeId,
    setIngredientFormIsVisible,
    setStepFormIsVisible
}) => {
    const [ingredient, setIngredient] = useState({
        id: '',
        name: '',
        ingredient_id: '',
        recipe_id: newRecipeId || recipeId,
        quantity: '',
        notes: ''
    });

    useEffect(() => {
        setIngredient({ ...ingredient, recipe_id: newRecipeId || recipeId })
    }, [newRecipeId, recipeId])

    const handleAddIngredient = (event) => {
        event.preventDefault();
        fetch(INGREDIENT_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `token ${getToken()}`
            },
            body: JSON.stringify(ingredient)
        })
            .then(response => response.json())
            .then(data => {
                setIngredient({
                    ...ingredient,
                    id: data.recipe_ingredient_id,
                    ingredient_id: data.ingredientId
                })
                let newIngredient = {
                    ...ingredient,
                    id: data.recipe_ingredient_id,
                    ingredient_id: data.ingredientId
                };
                handleUpdateIngredients(newIngredient);
                setIngredient({
                    id: '',
                    name: '',
                    ingredient_id: '',
                    recipe_id: newRecipeId || recipeId,
                    quantity: '',
                    notes: ''
                })
            })
            .catch(error => console.log('Failed to add ingredient: ', error))
    }

    const handleNext = () => {
        setIngredientFormIsVisible(false);
        setStepFormIsVisible(true);
    }

    return (
        <div>
            <form>
                <h2>Ingredients</h2>
                <label htmlFor="ingredientQuantity">Quantity</label>
                <input
                    type="text"
                    name="ingredientQuantity"
                    id="ingredientQuantity"
                    value={ingredient.quantity}
                    onChange={(event) => setIngredient({ ...ingredient, quantity: event.target.value })}
                />
                <label htmlFor="ingredientName">Ingredient</label>
                <input
                    type="text"
                    name="ingredientName"
                    id="ingredientName"
                    value={ingredient.name}
                    onChange={(event) => setIngredient({ ...ingredient, name: event.target.value })}
                />
                <label htmlFor="ingredientNotes">Notes</label>
                <textarea
                    name="ingredientNotes"
                    id="ingredientNotes"
                    rows="3"
                    value={ingredient.notes}
                    onChange={(event) => setIngredient({ ...ingredient, notes: event.target.value })}
                />
                <button onClick={(event) => handleAddIngredient(event)}>
                    Add Ingredient
                </button>
            </form>

            <button onClick={handleNext}>
                Next
            </button>
        </div>
    )
}

export default IngredientForm;