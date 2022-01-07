import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import Project from "./Components/Project";
import ProjectForm from "./Components/ProjectForm";
import Recipe from "./Components/Recipe";
import RecipeForm from './Components/RecipeForm';
import Rate from './Components/Rate';

const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />

            {/* Projects Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/project/create" element={<ProjectForm type="create" />} />
            <Route path="/project/update/:id" element={<ProjectForm type="update" />} />

            {/* Recipe Routes */}
            <Route path="/project/:projectId/recipe/:recipeId" element={<Recipe />} />
            <Route path="/project/:projectId/recipe/create" element={<RecipeForm type="create" />} />
            <Route path="/project/:projectId/recipe/update/:recipeId" element={<RecipeForm type="update" />} />

            {/* Rating Routes */}
            <Route path="/recipe/:recipeId/rate" element={<Rate />} />
        </Routes>
    )
}

export default Router;