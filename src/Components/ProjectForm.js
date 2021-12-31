import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CapitalizeFirstLetter } from "../helpers";

const PROJECT_API = 'https://pizza-recipe-app.herokuapp.com/projects';

const ProjectForm = ({ type }) => {
    const [project, setProject] = useState({
        name: '',
        featured_image_id: null
    });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (type === 'update') {
            fetch(PROJECT_API + '/' + id)
                .then(response => response.json())
                .then(data => setProject(data[0]))
                .catch(error => console.log('Failed to fetch project: ', error))
        }
    }, [])

    const handleChange = (event) => {
        setProject({
            ...project,
            name: event.target.value,
            featured_image_id: null
        });
    }

    const handleSubmit = () => {
        setIsLoading(true);

        let apiUrl;
        let method;

        if (type === 'create') {
            apiUrl = PROJECT_API;
            method = 'POST';
        } else {
            apiUrl = PROJECT_API + '/' + id;
            method = 'PUT';
        }

        fetch(apiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(project),
        })
            .then(() => {
                setIsLoading(false);
                navigate('/dashboard');
            })
            .catch(error => console.log('Error: ', error))
    }

    return (
        <div>
            {CapitalizeFirstLetter(type)} Project
            {project.name && <h2>{project.name}</h2>}
            <form>
                <input type="text" name="name" value={project.name} onChange={(event) => handleChange(event)} />
                <button type="button" onClick={handleSubmit}>{CapitalizeFirstLetter(type)}</button>
                {isLoading && (<p>{type === 'create' ? 'Creating' : 'Updating'}...</p>)}
            </form>
        </div>
    );
}

export default ProjectForm;