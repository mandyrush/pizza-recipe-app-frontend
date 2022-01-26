import React from "react";
import { Link } from "react-router-dom";

import styles from './ProjectCard.module.css';

const ProjectCard = ({
    project,
    removeProject,
    index,
    randomNumber
}) => {
    return (
        <article key={index} className={styles.card}>
            <div className={styles.cardImage}>
                <img src={`/images/pizzas/pizza_${randomNumber}.jpg`} alt={project.name} />
                <p>{project.name}</p>
            </div>
            <div className={styles.cardContent}>
                <Link
                    // className={styles.link}
                    className="btn-outline-white btn-sm"
                    to={`/project/${project.id}`}
                    state={{ project: project }}
                >
                    <i className="fas fa-eye"></i> View
                </Link>
                <Link
                    // className={styles.link}
                    className="btn-outline-white btn-sm"
                    to={`/project/update/${project.id}`}
                    state={{ project: project }}
                >
                    <i className="fas fa-pencil-alt"></i> Edit
                </Link>
                <button
                    // className={styles.link}
                    className="btn-outline-white btn-sm"
                    onClick={() => removeProject(project.id)}
                >
                    <i className="fas fa-trash-alt"></i> Delete
                </button>
            </div>
        </article>
    )
}

export default ProjectCard;