import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CapitalizeFirstLetter, getToken } from "../helpers";

import styles from './RecipeForm.module.css';

import IngredientForm from "./IngredientForm";
import StepForm from './StepForm';

const RECIPE_API = 'https://pizza-recipe-app.herokuapp.com/recipes';
const INGREDIENTS_API = `https://pizza-recipe-app.herokuapp.com/ingredients`;
const STEP_API = `https://pizza-recipe-app.herokuapp.com/steps`;

const RecipeForm = ({ type }) => {
    const { projectId, recipeId } = useParams();
    const location = useLocation();

    const [recipe, setRecipe] = useState({
        name: '',
        notes: '',
        project_id: projectId
    })

    const [newRecipeId, setNewRecipeId] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [recipeFormIsVisible, setRecipeFormIsVisible] = useState(true);
    const [ingredientFormIsVisible, setIngredientFormIsVisible] = useState(false);
    const [stepFormIsVisible, setStepFormIsVisible] = useState(false);

    // const navigate = useNavigate();

    useEffect(() => {
        if (type === 'update' || type === 'clone') {

            if (type === 'clone') {
                setRecipe({ ...location.state.recipe, name: `Copy of ${location.state.recipe.name}` });
            } else {
                setRecipe(location.state.recipe);
            }

            // Get any ingredients for this recipe
            fetch(`${INGREDIENTS_API}?recipe=${location.state.recipe.id}`)
                .then(response => response.json())
                .then(data => setIngredients(data))
                .catch(error => console.log('Failed to fetch ingredients: ', error))

            // Get any steps for this recipe
            fetch(`${STEP_API}?recipe=${location.state.recipe.id}`)
                .then(response => response.json())
                .then(data => setSteps(data))
                .catch(error => console.log('Failed to fetch steps: ', error))
        }
    }, [])

    const handleUpdateIngredients = (ingredient) => {
        let newIngredients = [...ingredients, ingredient];
        setIngredients(newIngredients);
    }

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

    const handleUpdateSteps = (step) => {
        let newSteps = [...steps, step];
        setSteps(newSteps);
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

    const handleSubmit = () => {
        setIsLoading(true);

        if (type === 'create' || type === 'clone') {
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
                    setRecipeFormIsVisible(false);
                    setIngredientFormIsVisible(true);
                })
                .catch(error => console.log('Error: ', error))
        } else {
            fetch(`${RECIPE_API}/${recipeId}`, {
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
                    setRecipeFormIsVisible(false);
                    setIngredientFormIsVisible(true);
                })
                .catch(error => console.log('Error: ', error))
        }
    }

    return (
        <div>
            <header>
                <h1>{CapitalizeFirstLetter(type)} Recipe</h1>
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
                    <div className={styles.recipeForms}>
                        {recipeFormIsVisible && (
                            <div>
                                <h2>Recipe</h2>
                                <form>
                                    <label htmlFor="name">Version Name</label>
                                    <input type="text" name="name" id="name" value={recipe.name} onChange={(event) => setRecipe({ ...recipe, name: event.target.value })} />
                                    <h2>Notes</h2>
                                    <label htmlFor="notes">Notes</label>
                                    <textarea name="notes" id="notes" value={recipe.notes} onChange={(event) => setRecipe({ ...recipe, notes: event.target.value })} rows="3" />
                                    <button type="button" onClick={handleSubmit}>Next</button>
                                    {isLoading && (<p>{type === 'create' ? 'Creating' : 'Updating'}...</p>)}
                                </form>
                            </div>
                        )}

                        {ingredientFormIsVisible && (
                            <div>
                                <h2>Ingredients</h2>
                                <IngredientForm
                                    handleUpdateIngredients={handleUpdateIngredients}
                                    newRecipeId={newRecipeId}
                                    recipeId={recipeId}
                                    setIngredientFormIsVisible={setIngredientFormIsVisible}
                                    setStepFormIsVisible={setStepFormIsVisible}
                                    type={type}
                                    ingredientsToClone={ingredients}
                                />
                            </div>
                        )}

                        {stepFormIsVisible && (
                            <div>
                                <h2>Steps</h2>
                                <StepForm
                                    handleUpdateSteps={handleUpdateSteps}
                                    newRecipeId={newRecipeId}
                                    recipeId={recipeId}
                                    projectId={projectId}
                                    type={type}
                                    stepsToClone={steps}
                                />
                            </div>
                        )}

                        {/* <h2>Gallery</h2> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeForm;