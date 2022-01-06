import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const RATINGS_API = `https://pizza-recipe-app.herokuapp.com/ratings`;

const RecipeCard = ({
    recipe,
    handleDelete,
    project
}) => {
    const [ratings, setRatings] = useState([]);
    const [averageRatings, setAverageRatings] = useState(0);

    useEffect(() => {
        fetch(RATINGS_API + `?recipe=${recipe.id}`)
            .then(response => response.json())
            .then(data => setRatings(data))
            .catch(error => console.log('Failed to fetch ratings: ', error))
    }, [])

    useEffect(() => {
        let ratingsArray = [...ratings];
        let total = 0;
        ratingsArray.forEach(rating => {
            total += rating.score
        });
        if (total !== 0) {
            let average = total / ratingsArray.length;
            setAverageRatings(average);
        }
    }, [ratings])

    return (
        <div>
            <p>{recipe.name} - {
                averageRatings > 0 && (
                    <Link to={`/recipe/${recipe.id}/rating`}>{averageRatings}</Link>
                )
            }
                {
                    averageRatings === 0 && (
                        <Link to={`/recipe/${recipe.id}/rate`}>Rate</Link>
                    )
                }</p>
            <Link
                to={`recipe/${recipe.id}`}
                state={{
                    recipe: recipe,
                    project: project,
                    ratings: ratings
                }}
            >
                View
            </Link>
            <Link
                to={`/project/${project.id}/recipe/update/${recipe.id}`}
                state={{ recipe: recipe }}
            >
                Edit
            </Link>
            <button onClick={() => handleDelete(recipe.id)}>Delete</button>
            <Link to={`/project/${project.id}/recipe/create`}>New Version</Link>
            <hr />
        </div>
    )
}

export default RecipeCard;