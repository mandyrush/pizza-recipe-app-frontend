import React from "react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Projects from './Projects';
// import styles from './Dashboard.module.css';

let FETCH_ALL_PROJECTS_API = 'https://pizza-recipe-app.herokuapp.com/projects';
const DELETE_PROJECT_API = 'https://pizza-recipe-app.herokuapp.com/projects/';

const Dashboard = () => {
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
                console.log('Updated Projects: ', updatedProjects);
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
            <Projects projects={projects} removeProject={removeProject} />
            <Link to="/project/create">New Project</Link>
        </div>
    );
}

export default Dashboard;