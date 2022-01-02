import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CapitalizeFirstLetter } from "../helpers";

import styles from './RecipeForm.module.css';

import IngredientForm from "./IngredientForm";

const RECIPE_API = 'https://pizza-recipe-app.herokuapp.com/recipes';

const RecipeForm = ({ type }) => {
    const { projectId } = useParams();
    const location = useLocation();

    const [recipe, setRecipe] = useState({
        name: '',
        notes: '',
        project_id: projectId
    })

    const [newRecipeId, setNewRecipeId] = useState(null);
    const [ingredients, setIngredients] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    // const navigate = useNavigate();

    useEffect(() => {
        if (type === 'update') {
            setRecipe(location.state.recipe);
        }
    }, [])

    const handleUpdateIngredients = (ingredient) => {
        let newIngredients = [...ingredients, ingredient];
        setIngredients(newIngredients);
    }

    const handleSubmit = () => {
        setIsLoading(true);

        let apiUrl;
        let method;

        if (type === 'create') {
            apiUrl = RECIPE_API;
            method = 'POST';
        } else {
            apiUrl = RECIPE_API + '/' + recipe.id;
            method = 'PUT';
        }

        fetch(apiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(recipe),
        })
            .then(response => response.json())
            .then((data) => {
                console.log('Data: ', data['insertId']);
                setIsLoading(false);
                setNewRecipeId(data['insertId']);
                // navigate('/dashboard');
            })
            .catch(error => console.log('Error: ', error))
    }

    return (
        <div>
            <header>
                <h1>{CapitalizeFirstLetter(type)} Pizza</h1>
            </header>
            <div className="interior-content">
                <div className={styles.layout}>
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
                                    <li key={index}>{ingredient.quantity} {ingredient.name} - {ingredient.notes}</li>
                                ))}
                            </ul>
                        }
                        <h2>Instructions</h2>

                        <h2>Gallery</h2>
                    </div>
                    <div className={styles.recipeForms}>
                        <h2>Recipe</h2>
                        <form>
                            <label htmlFor="name">Version Name</label>
                            <input type="text" name="name" id="name" value={recipe.name} onChange={(event) => setRecipe({ ...recipe, name: event.target.value })} />
                            <h2>Notes</h2>
                            <label htmlFor="notes">Notes</label>
                            <textarea name="notes" id="notes" value={recipe.notes} onChange={(event) => setRecipe({ ...recipe, notes: event.target.value })} rows="3" />
                            <button type="button" onClick={handleSubmit}>Save</button>
                            {isLoading && (<p>{type === 'create' ? 'Creating' : 'Updating'}...</p>)}
                        </form>

                        <h2>Ingredients</h2>

                        <IngredientForm
                            handleUpdateIngredients={handleUpdateIngredients}
                            newRecipeId={newRecipeId}
                        />

                        <h2>Instructions</h2>

                        <h2>Gallery</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeForm;