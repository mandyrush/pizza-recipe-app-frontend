import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CREATE_PROJECT_API = 'https://pizza-recipe-app.herokuapp.com/projects';

const ProjectCreate = () => {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const data = {
        "name": name,
        "featured_image_id": null
    }

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = () => {
        setIsLoading(true);
        fetch(CREATE_PROJECT_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(() => {
                setIsLoading(false);
                navigate('/dashboard');
            })
            .catch(error => console.log('Error: ', error))
    }

    return (
        <div>
            Create a Project
            <form>
                <input type="text" name="projectName" onChange={(event) => handleChange(event)} />
                <button type="button" onClick={handleSubmit}>Create</button>
                {isLoading && (<p>Creating...</p>)}
            </form>
        </div>
    );
}

export default ProjectCreate;