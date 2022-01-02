import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import Project from "./Components/Project";
import ProjectForm from "./Components/ProjectForm";
import Recipe from "./Components/Recipe";
import RecipeForm from './Components/RecipeForm';

const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />

            {/* Projects Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/project/create" element={<ProjectForm type="create" />} ></Route>
            <Route path="/project/update/:id" element={<ProjectForm type="update" />}></Route>

            {/* Recipe Routes */}
            <Route path="/project/:projectId/recipe/:recipeId" element={<Recipe />}></Route>
            <Route path="/project/:projectId/recipe/create" element={<RecipeForm type="create" />}></Route>
            <Route path="/project/:projectId/recipe/update/:recipeId" element={<RecipeForm type="update" />}></Route>
        </Routes>
    )
}

export default Router;