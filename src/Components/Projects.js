import React from "react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getToken, getUserId } from "../helpers";

import ProjectCard from "./ProjectCard";

import styles from './Projects.module.css';

const FETCH_ALL_PROJECTS_API = 'https://pizza-recipe-app.herokuapp.com/projects';
const DELETE_PROJECT_API = 'https://pizza-recipe-app.herokuapp.com/projects/';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const removeProject = (id) => {
        fetch(DELETE_PROJECT_API + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${getToken()}`
            }
        })
            .then(data => {
                let updatedProjects = projects.filter(project => project.id !== id);
                setProjects(updatedProjects);
            })
            .catch(error => console.log('Failed to delete project: ', error))
    }

    useEffect(() => {
        setIsLoading(true);
        fetch(`${FETCH_ALL_PROJECTS_API}?user_id=${getUserId()}`, {
            headers: {
                'Authorization': `token ${getToken()}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                setProjects(data)
            })
            .catch(error => console.log('Error: ', error))
    }, []);

    return (
        <div>
            <h1>My Pizzas</h1>
            {isLoading && <p>Making Pizzas...</p>}
            <div className={styles.projectCards}>
                {projects.map((project, index) => {
                    return (
                        <ProjectCard project={project} key={index} removeProject={removeProject} />
                    )
                })}
            </div>
            <Link to={'/project/create'} >Create Pizza</Link>
        </div>
    );
}

export default Projects;