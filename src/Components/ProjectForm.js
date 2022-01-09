import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { CapitalizeFirstLetter } from "../helpers";

import styles from './ProjectForm.module.css';

const PROJECT_API = 'https://pizza-recipe-app.herokuapp.com/projects';

const ProjectForm = ({ type }) => {
    const [project, setProject] = useState({
        name: '',
        featured_image_id: null
    });
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (type === 'update') {
            setProject(location.state.project);
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
            <header>
                <h1>{CapitalizeFirstLetter(type)} Pizza</h1>
                {project.name && <h2>{project.name}</h2>}
            </header>
            <div className="interior-content">
                <form>
                    <input type="text" name="name" id="name" value={project.name} onChange={(event) => handleChange(event)} />
                    <label htmlFor="name">Name</label>
                    {/* <p>Upload Project Image <button>Upload</button></p> */}
                    <button type="button" onClick={handleSubmit}>{CapitalizeFirstLetter(type)}</button>
                    <Link to={'/dashboard'} >Cancel</Link>
                    {isLoading && (<p>{type === 'create' ? 'Creating' : 'Updating'}...</p>)}
                </form>
            </div>
        </div>
    );
}

export default ProjectForm;