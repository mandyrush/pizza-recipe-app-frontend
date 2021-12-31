import React from "react";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

const Recipe = () => {
    const [recipe, setRecipe] = useState([])

    let location = useLocation();

    useEffect(() => {
        setRecipe(location.state.recipe);
    }, [])

    return (
        <div>
            <h1>{recipe.name}</h1>
            <p>{recipe.notes}</p>
        </div>
    )
}

export default Recipe;