import React from "react";
import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from "react-router-dom";

import styles from './Recipe.module.css';

const Recipe = () => {
    const { projectId } = useParams();

    const [recipe, setRecipe] = useState([])

    let location = useLocation();

    useEffect(() => {
        setRecipe(location.state.recipe);
    }, [])

    return (
        <div>
            <header>
                <h1>Project Name</h1>
                <h2>{recipe.name}</h2>
            </header>
            {/* <Link to={`/project/${projectId}`}>Back to Project</Link> */}
            <div className="interior-content">
                <div className={styles.recipeLayout}>
                    <div>
                        <h2>Ingredients</h2>
                        <hr />
                        <h2>Instructions</h2>
                        <hr />
                        <h2>Notes</h2>
                        <p>{recipe.notes}</p>
                        <hr />
                        <h2>Gallery</h2>
                    </div>
                    <div className={styles.ratings}>
                        <h2>Ratings</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recipe;