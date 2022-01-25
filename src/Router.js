import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { checkAuth } from "./helpers";

import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import Project from "./Components/Project";
import ProjectForm from "./Components/ProjectForm";
import Recipe from "./Components/Recipe";
import RecipeManager from './Components/RecipeManager';
import Rate from './Components/Rate';
import Register from "./Components/Register";


const ProtectedRoute = ({ children }) => {
    return checkAuth() ? children : <Navigate to="/" />;
}

const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />

            {/* Projects Routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ ProtectedRoute>
                }
            />
            <Route
                path="/project/:id"
                element={
                    <ProtectedRoute>
                        <Project />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/project/create"
                element={
                    <ProtectedRoute>
                        <ProjectForm type="create" />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/project/update/:id"
                element={
                    <ProtectedRoute>
                        <ProjectForm type="update" />
                    </ProtectedRoute>
                }
            />

            {/* Recipe Routes */}
            <Route
                path="/project/:projectId/recipe/:recipeId"
                element={
                    <ProtectedRoute>
                        <Recipe />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/project/:projectId/recipe/create"
                element={
                    <ProtectedRoute>
                        <RecipeManager type="create" />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/project/:projectId/recipe/update/:recipeId"
                element={
                    <ProtectedRoute>
                        <RecipeManager type="update" />
                    </ProtectedRoute>
                }
            />

            {/* Rating Routes */}
            <Route
                path="/project/:projectId/recipe/:recipeId/rate"
                element={
                    <ProtectedRoute>
                        <Rate />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default Router;