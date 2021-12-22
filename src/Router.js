import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./Components/Home";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Project from "./Components/Project";
import ProjectCreate from "./Components/ProjectCreate";

const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Projects Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/project/create" element={<ProjectCreate />} ></Route>
        </Routes>
    )
}

export default Router;