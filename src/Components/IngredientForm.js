import React from "react";
import { useState, useEffect } from 'react';

const INGREDIENT_API = `https://pizza-recipe-app.herokuapp.com/ingredients`;

const IngredientForm = ({
    handleUpdateIngredients,
    newRecipeId,
    setIngredientFormIsVisible,
    setStepFormIsVisible
}) => {
    const [ingredient, setIngredient] = useState({
        name: '',
        recipe_id: newRecipeId,
        quantity: '',
        notes: ''
    });

    useEffect(() => {
        setIngredient({ ...ingredient, recipe_id: newRecipeId })
    }, [newRecipeId])

    const handleNext = () => {
        setIngredientFormIsVisible(false);
        setStepFormIsVisible(true);
    }

    const handleAddIngredient = (event) => {
        event.preventDefault();
        fetch(INGREDIENT_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(ingredient)
        })
            .then(data => {
                handleUpdateIngredients(ingredient);
                setIngredient({
                    name: '',
                    recipe_id: newRecipeId,
                    quantity: '',
                    notes: ''
                })
            })
            .catch(error => console.log('Failed to add ingredient: ', error))
        console.log('Ingredient to add: ', ingredient);
    }

    return (
        <form>
            <label htmlFor="ingredientQuantity">Quantity</label>
            <input type="text" name="ingredientQuantity" id="ingredientQuantity" value={ingredient.quantity} onChange={(event) => setIngredient({ ...ingredient, quantity: event.target.value })} />
            <label htmlFor="ingredientName">Ingredient</label>
            <input type="text" name="ingredientName" id="ingredientName" value={ingredient.name} onChange={(event) => setIngredient({ ...ingredient, name: event.target.value })} />
            <label htmlFor="ingredientNotes">Notes</label>
            <textarea name="ingredientNotes" id="ingredientNotes" rows="3" value={ingredient.notes} onChange={(event) => setIngredient({ ...ingredient, notes: event.target.value })} />
            <button onClick={(event) => handleAddIngredient(event)}>Add Ingredient</button>
            <button onClick={handleNext}>Next</button>
        </form>
    )
}

export default IngredientForm;