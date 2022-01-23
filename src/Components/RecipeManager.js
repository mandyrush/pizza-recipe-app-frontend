import React from "react";
import { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { CapitalizeFirstLetter } from "../helpers";

import styles from './RecipeManager.module.css';

import RecipePreview from "./RecipePreview";
import RecipeForm from "./RecipeForm";
import IngredientForm from "./IngredientForm";
import StepForm from './StepForm';

const INGREDIENTS_API = `https://pizza-recipe-app.herokuapp.com/ingredients`;
const STEP_API = `https://pizza-recipe-app.herokuapp.com/steps`;

const RecipeManager = ({ type }) => {
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

    // Form Visibility
    const [RecipeManagerIsVisible, setRecipeManagerIsVisible] = useState(true);
    const [ingredientFormIsVisible, setIngredientFormIsVisible] = useState(false);
    const [stepFormIsVisible, setStepFormIsVisible] = useState(false);

    useEffect(() => {
        if (type === 'update') {
            // Set the recipe that is being used
            setRecipe(location.state.recipe);

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

    const handleUpdateSteps = (step) => {
        let newSteps = [...steps, step];
        setSteps(newSteps);
    }

    return (
        <div>
            <header>
                <h1>{CapitalizeFirstLetter(type)} Recipe</h1>
            </header>
            <div className="interior-content">
                <div className={styles.layout}>
                    <RecipePreview
                        recipe={recipe}
                        ingredients={ingredients}
                        steps={steps}
                        setIngredients={setIngredients}
                        setSteps={setSteps}
                        ingredientFormIsVisible={ingredientFormIsVisible}
                        stepFormIsVisible={stepFormIsVisible}
                    />
                    <div className={styles.RecipeForms}>
                        {RecipeManagerIsVisible && (
                            <div>
                                <RecipeForm
                                    recipe={recipe}
                                    setRecipe={setRecipe}
                                    type={type}
                                    setNewRecipeId={setNewRecipeId}
                                    setRecipeManagerIsVisible={setRecipeManagerIsVisible}
                                    setIngredientFormIsVisible={setIngredientFormIsVisible}
                                />
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

export default RecipeManager;