import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useEffect, useState } from 'react';

const Project = () => {
    const [project, setProject] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const { id } = useParams();
    const GET_SINGLE_PROJECT_API = `https://pizza-recipe-app.herokuapp.com/projects/${id}`;
    const GET_RECIPES_API = `https://pizza-recipe-app.herokuapp.com/recipes?project=${id}`;

    useEffect(() => {
        fetch(GET_SINGLE_PROJECT_API)
            .then(response => response.json())
            .then(data => setProject(data[0]))
            .catch(error => console.log('Failed to fetch project: ', error))
    }, [GET_SINGLE_PROJECT_API]);

    useEffect(() => {
        fetch(GET_RECIPES_API)
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.log('Failed to fetch recipes: ', error))
    }, [])

    return (
        <div>
            {project && (
                <h1>{project.name}</h1>
            )}

            Image Placeholder

            <h2>Revision History</h2>
            {recipes.length > 0 && (
                <p>List Recipes Here</p>
            )}

            {recipes.length <= 0 && (
                <div>
                    <p>Create new version to get started!</p>
                    <Link to={`/project/${project.id}/recipe/create`}>Create</Link>
                </div>
            )}
        </div>
    );
}

export default Project;