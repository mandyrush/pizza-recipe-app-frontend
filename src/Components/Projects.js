import React from "react";
import { Link } from "react-router-dom";
import styles from './Projects.module.css';

const Projects = ({ projects }) => {
    return (
        <div>
            <h2>My Pizzas</h2>
            <div className={styles.projectCards}>
                {projects.map((project, index) => {
                    return (
                        <div key={index} className={styles.card}>
                            <Link className={styles.btn} to={`/project/${project.id}`} >{project.name}</Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Projects;