import React from "react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getToken, getUserId } from "../helpers";
import {config} from '../Constants';

import Header from "./Header";
import ProjectCard from "./ProjectCard";
import LoadingSpinner from "./LoadingSpinner";

import styles from './Projects.module.css';

const FETCH_ALL_PROJECTS_API = `${config.url}/projects`;
const DELETE_PROJECT_API = `${config.url}/projects/`;

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
            <Header title={'My Pizzas'} />
            <section className="container">
                <div className={styles.projectCards}>
                    <article className={styles.ghostCard}>
                        <Link to={'/project/create'} className="btn-primary" >Create Pizza</Link>
                    </article>
                    {projects.map((project, index) => {
                        return (
                            <ProjectCard
                                project={project}
                                key={index}
                                removeProject={removeProject}
                                randomNumber={Math.floor(Math.random() * 4) + 1}
                            />
                        )
                    })}
                </div>
            </section>
            {isLoading && (
                <LoadingSpinner
                    message={'Making Pizzas...'}
                />
            )}
        </div>
    );
}

export default Projects;