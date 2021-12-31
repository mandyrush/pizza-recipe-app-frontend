import React from "react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import ProjectCard from "./ProjectCard";

import styles from './Projects.module.css';

let FETCH_ALL_PROJECTS_API = 'https://pizza-recipe-app.herokuapp.com/projects';
const DELETE_PROJECT_API = 'https://pizza-recipe-app.herokuapp.com/projects/';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    const removeProject = (id) => {
        fetch(DELETE_PROJECT_API + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(data => {
                let updatedProjects = projects.filter(project => project.id !== id);
                setProjects(updatedProjects);
            })
            .catch(error => console.log('Error: ', error))
    }

    useEffect(() => {
        fetch(FETCH_ALL_PROJECTS_API)
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.log('Error: ', error))
    }, []);

    return (
        <div>
            <h2>My Pizzas</h2>
            <div className={styles.projectCards}>
                {projects.map((project, index) => {
                    return (
                        <ProjectCard project={project} key={index} removeProject={removeProject} />
                    )
                })}
            </div>
            <Link to={'/project/create'} >Create Project</Link>
        </div>
    );
}

export default Projects;