import React from "react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getToken } from "../helpers";

import RecipeCard from "./RecipeCard";
import Header from "./Header";

import styles from './Project.module.css';

const RECIPES_API = `https://pizza-recipe-app.herokuapp.com/recipes`;
const PROJECT_API = `https://pizza-recipe-app.herokuapp.com/projects`;

const Project = () => {
    const [project, setProject] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [highestRating, setHighestRating] = useState({});
    const [showRatingBanner, setShowRatingBanner] = useState(false);

    const { id } = useParams();

    // Get project info
    useEffect(() => {
        fetch(`${PROJECT_API}/${id}`, {
            headers: {
                'Authorization': `token ${getToken()}`
            }
        })
            .then(response => response.json())
            .then(data => setProject(data[0]))
            .catch(error => console.log('Failed to fetch project: ', error))
    }, [])

    // Get recipes for this project
    useEffect(() => {
        fetch(RECIPES_API + '?project=' + id, {
            headers: {
                'Authorization': `token ${getToken()}`
            }
        })
            .then(response => response.json())
            .then(data => {
                let recipeArray = data.map(recipe => ({ ...recipe, 'ratings_average': 0 }));
                setRecipes(recipeArray);
            })
            .catch(error => console.log('Failed to fetch recipes: ', error))
    }, [])

    // Check to see if any recipes need rated, if so show reminder banner
    useEffect(() => {
        let ratingNeeded = recipes.findIndex(recipe => recipe.ratings_average === 0);
        if (ratingNeeded !== -1) {
            setShowRatingBanner(true);
        } else {
            setShowRatingBanner(false);
        }
        getHighestAverage();
    }, [recipes])

    const updateAverage = (averageData) => {
        // Find the recipe to be updated
        let foundIndex = recipes.findIndex(recipe => recipe.id === averageData.recipeId);

        if (foundIndex !== -1) {
            let updatedRecipes = [...recipes];
            updatedRecipes[foundIndex].ratings_average = averageData.average;
            setRecipes(updatedRecipes);
        }
    }

    const getHighestAverage = () => {
        if (recipes.length > 0) {
            let highestRating = recipes.reduce(function (prev, current) {
                return (Number(prev.ratings_average) > Number(current.ratings_average)) ? prev : current
            })
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
        <main>
            {
                showRatingBanner && (
                    <p className={styles.ratingBanner}>You have recipes to rate!</p>
                )
            }
            <Header title={project.name} />
            <div className="container">
                <h2>Versions</h2>
                {recipes.length > 0 && (
                    recipes.map((recipe, index) => (
                        <RecipeCard
                            key={index}
                            recipe={recipe}
                            handleDelete={handleDelete}
                            project={project}
                            updateAverage={updateAverage}
                            highestRating={highestRating.id === recipe.id}
                            setRecipes={setRecipes}
                            recipes={recipes}
                        />
                    ))
                )}

                {
                    recipes.length <= 0 && (
                        <div>
                            <p>Create a new version to get started!</p>
                            <Link
                                to={`/project/${project.id}/recipe/create`}
                                className="btn-primary"
                            >
                                Create
                            </Link>
                        </div>
                    )
                }
            </div>
        </main>
    );
}

export default Project;