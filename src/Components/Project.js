import React from "react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

const Project = () => {
    const [project, setProject] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const location = useLocation();
    const { id } = useParams();
    const RECIPES_API = `https://pizza-recipe-app.herokuapp.com/recipes`;

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
            {project && (
                <h1>{project.name}</h1>
            )}

            Image Placeholder

            <h2>Revision History</h2>
            {recipes.length > 0 && (
                recipes.map((recipe, index) => (

                    <div key={index}>
                        <p>Version Number: {recipe.version}</p>
                        <p>Parent Version: {recipe.parent_version}</p>
                        <Link
                            to={`recipe/${recipe.id}`}
                            state={{ recipe: recipe }}
                        >
                            View
                        </Link>
                        <p>Rating Placeholder</p>
                        <Link to={`/project/${project.id}/recipe/create`}>New Version</Link>
                        <Link
                            to={`/project/${project.id}/recipe/update/${recipe.id}`}
                            state={{ recipe: recipe }}
                        >
                            Edit
                        </Link>
                        <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                    </div>
                ))
            )}

            {
                recipes.length <= 0 && (
                    <div>
                        <p>Create new version to get started!</p>
                        <Link to={`/project/${project.id}/recipe/create`}>Create</Link>
                    </div>
                )
            }
        </div >
    );
}

export default Project;