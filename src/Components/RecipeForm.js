import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CapitalizeFirstLetter } from "../helpers";

const RECIPE_API = 'https://pizza-recipe-app.herokuapp.com/recipes';

const RecipeForm = ({ type }) => {
    const { projectId, recipeId } = useParams();
    const location = useLocation();

    const [recipe, setRecipe] = useState({
        name: '',
        notes: '',
        project_id: projectId
    })
    const [isLoading, setIsLoading] = useState(false);

    // const navigate = useNavigate();

    useEffect(() => {
        if (type === 'update') {
            setRecipe(location.state.recipe);
        }
    }, [])

    const handleSubmit = () => {
        setIsLoading(true);

        let apiUrl;
        let method;

        if (type === 'create') {
            apiUrl = RECIPE_API;
            method = 'POST';
        } else {
            apiUrl = RECIPE_API + '/' + recipeId;
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
            .then(() => {
                setIsLoading(false);
                // navigate('/dashboard');
            })
            .catch(error => console.log('Error: ', error))
    }

    return (
        <div>
            {CapitalizeFirstLetter(type)} Pizza
            {recipe.name && <h2>{recipe.name}</h2>}
            {recipe.notes && <p>{recipe.notes}</p>}

            <form>
                <label htmlFor="name">Version Name</label>
                <input type="text" name="name" id="name" value={recipe.name} onChange={(event) => setRecipe({ ...recipe, name: event.target.value })} />
                <label htmlFor="notes">Notes</label>
                <textarea name="notes" id="notes" value={recipe.notes} onChange={(event) => setRecipe({ ...recipe, notes: event.target.value })} rows="3" />
                <button type="button" onClick={handleSubmit}>Save</button>
                {isLoading && (<p>{type === 'create' ? 'Creating' : 'Updating'}...</p>)}
            </form>
        </div>
    )
}

export default RecipeForm;