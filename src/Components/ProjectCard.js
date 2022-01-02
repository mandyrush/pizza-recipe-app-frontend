import React from "react";
import { Link } from "react-router-dom";

import styles from './ProjectCard.module.css';

const ProjectCard = ({
    project,
    removeProject,
    index
}) => {
    return (
        <div key={index} className={styles.card}>
            <div className={styles.cardImage}>
                <p>{project.name}</p>
            </div>
            <div className={styles.cardContent}>
                <Link
                    className={styles.link}
                    to={`/project/${project.id}`}
                    state={{ project: project }}
                >
                    View
                </Link>
                <Link
                    className={styles.link}
                    to={`/project/update/${project.id}`}
                    state={{ project: project }}
                >
                    Edit
                </Link>
                <button className={styles.link} onClick={() => removeProject(project.id)}>Delete</button>
            </div>
        </div>
    )
}

export default ProjectCard;