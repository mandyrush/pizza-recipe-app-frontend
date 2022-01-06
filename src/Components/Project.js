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
                            project={project} />
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