import React from "react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

import RecipeCard from "./RecipeCard";

import styles from './Project.module.css';

const RECIPES_API = `https://pizza-recipe-app.herokuapp.com/recipes`;

const Project = () => {
    const [project, setProject] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [recipeAverages, setRecipeAverages] = useState([]);
    const [highestRating, setHighestRating] = useState({});
    const [showRatingBanner, setShowRatingBanner] = useState(false);

    const location = useLocation();
    const { id } = useParams();

    useEffect(() => {
        setProject(location.state.project);
    }, [])

    useEffect(() => {
        fetch(RECIPES_API + '?project=' + id)
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.log('Failed to fetch recipes: ', error))
    }, [])

    useEffect(() => {
        let haveRecipesToRate = recipeAverages.find(average => average.average === 0);
        if (haveRecipesToRate !== -1) {
            setShowRatingBanner(true);
        }
    }, [recipeAverages])

    const updateAverage = (average) => {
        // Look through the recipe averages array, see if this one is in the array
        let foundAverageIndex = recipeAverages.findIndex(recipeAverage => recipeAverage.recipeId === average.recipeId);
        // If it is, update it
        if (foundAverageIndex !== -1) {
            recipeAverages[foundAverageIndex].average = average.average;
        } else {
            // If it isn't add it
            recipeAverages.push(average);
        }
        getHighestAverage();
    }

    const getHighestAverage = () => {
        // if (recipeAverages.length > 0) {
        let highestRating = recipeAverages.reduce(function (prev, current) {
            return (prev.average > current.average) ? prev : current
        })
        setHighestRating(highestRating);
        // }
    }

    const handleDelete = (id) => {
        fetch(RECIPES_API + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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
            <p>You have recipes to rate!</p>
            <header>
                {project && (
                    <h1>{project.name}</h1>
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
                            project={project}
                            updateAverage={updateAverage}
                            highestRating={highestRating.recipeId === recipe.id} />
                    ))
                )}

                {
                    recipes.length <= 0 && (
                        <div>
                            <p>Create a new version to get started!</p>
                            <Link to={`/project/${project.id}/recipe/create`}>Create</Link>
                        </div>
                    )
                }
            </div>
        </div >
    );
}

export default Project;