import React from "react";
import { useParams } from "react-router-dom";

import { useEffect, useState } from 'react';

const Project = () => {
    const [project, setProject] = useState([]);

    const { id } = useParams();
    const GET_SINGLE_PROJECT_API = `https://pizza-recipe-app.herokuapp.com/projects/${id}`;

    useEffect(() => {
        fetch(GET_SINGLE_PROJECT_API)
            .then(response => response.json())
            .then(data => setProject(data))
            .catch(error => console.log('Error: ', error))
    }, [GET_SINGLE_PROJECT_API]);

    return (
        <div>
            {project.length > 0 && (
                <h1>{project[0].name}</h1>
            )}
        </div>
    );
}

export default Project;