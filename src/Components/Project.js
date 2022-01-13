import React from "react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { getToken } from "../helpers";

import RecipeCard from "./RecipeCard";

import styles from './Project.module.css';

const RECIPES_API = `https://pizza-recipe-app.herokuapp.com/recipes`;

const Project = () => {
    const [recipes, setRecipes] = useState([]);
    const [recipeAverages, setRecipeAverages] = useState([]);
    const [highestRating, setHighestRating] = useState({});
    const [showRatingBanner, setShowRatingBanner] = useState(false);

    const location = useLocation();
    const { id } = useParams();

    // Get recipes for this project
    useEffect(() => {
        fetch(RECIPES_API + '?project=' + id, {
            headers: {
                'Authorization': `token ${getToken()}`
            }
        })
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.log('Failed to fetch recipes: ', error))
    }, [])

    // Check to see if any recipes need rated, if so show reminder banner
    useEffect(() => {
        let ratingNeeded = recipeAverages.findIndex(recipeAverage => recipeAverage.average === 0);
        if (ratingNeeded !== -1) {
            setShowRatingBanner(true);
        } else {
            setShowRatingBanner(false);
        }
        getHighestAverage();
    }, [recipeAverages])

    const updateAverage = (average) => {
        // Look through the recipe averages array, see if this one is in the array
        let foundAverageIndex = recipeAverages.findIndex(recipeAverage => recipeAverage.recipeId === average.recipeId);
        // If it is, update it
        if (foundAverageIndex !== -1) {
            let updatedRecipeAverages = [...recipeAverages];
            updatedRecipeAverages[foundAverageIndex] = average;
            setRecipeAverages(updatedRecipeAverages);
        } else {
            // If it isn't add it
            let updatedRecipeAverages = [...recipeAverages, average];
            setRecipeAverages(updatedRecipeAverages);
        }
    }

    const getHighestAverage = () => {
        if (recipeAverages.length > 0) {
            let highestRating = recipeAverages.reduce(function (prev, current) {
                return (Number(prev.average) > Number(current.average)) ? prev : current
            })
            console.log('Highest Rating: ', highestRating)
            setHighestRating(highestRating);
        }
    }

    const handleDelete = (id) => {
        fetch(RECIPES_API + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${getToken()}`
            }
        })
            .then(data => {
                let newRecipes = recipes.filter(recipe => recipe.id !== id);
                setRecipes(newRecipes);
            })
            .catch(error => console.log('Failed to delete recipe: ', error))
    }

    return (
        <div>
            {
                showRatingBanner && (
                    <p>You have recipes to rate!</p>
                )
            }
            <header>
                {location.state.project && (
                    <h1>{location.state.project.name}</h1>
                )}
            </header>
            <div className="interior-content">
                <h2>Pizza Versions</h2>
                <hr />
                {recipes.length > 0 && (
                    recipes.map((recipe, index) => (
                        <RecipeCard
                            key={index}
                            recipe={recipe}
                            handleDelete={handleDelete}
                            project={location.state.project}
                            updateAverage={updateAverage}
                            highestRating={highestRating.recipeId === recipe.id} />
                    ))
                )}

                {
                    recipes.length <= 0 && (
                        <div>
                            <p>Create a new version to get started!</p>
                            <Link to={`/project/${location.state.project.id}/recipe/create`}>Create</Link>
                        </div>
                    )
                }
            </div>
        </div >
    );
}

export default Project;