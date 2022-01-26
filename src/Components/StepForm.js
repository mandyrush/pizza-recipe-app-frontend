import React from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getToken } from "../helpers";
import styles from './StepForm.module.css';

const STEP_API = `https://pizza-recipe-app.herokuapp.com/steps`;

const StepForm = ({
    handleUpdateSteps,
    newRecipeId,
    recipeId,
    projectId
}) => {
    const [step, setStep] = useState({
        id: '',
        step: '',
        recipe_id: newRecipeId || recipeId,
        step_order: ''
    });

    useEffect(() => {
        setStep({ ...step, recipe_id: newRecipeId || recipeId })
    }, [newRecipeId])

    const handleAddStep = (event) => {
        event.preventDefault();
        fetch(STEP_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `token ${getToken()}`
            },
            body: JSON.stringify(step)
        })
            .then(response => response.json())
            .then(data => {
                setStep({ ...step, id: data.stepId })
                let newStep = { ...step, id: data.stepId }
                handleUpdateSteps(newStep);
                setStep({
                    id: '',
                    step: '',
                    recipe_id: newRecipeId || recipeId,
                    step_order: ''
                })
            })
            .catch(error => console.log('Failed to add step: ', error))
    }

    return (
        <div className={styles.stepForm}>
            <div className={styles.stepContainer}>
                <form>
                    <h2>Steps</h2>
                    <label htmlFor="step">Step</label>
                    <input
                        type="text"
                        name="step"
                        id="step"
                        value={step.step}
                        onChange={(event) => setStep({ ...step, step: event.target.value })}
                    />
                    <button
                        className="btn-outline"
                        onClick={(event) => handleAddStep(event)}
                    >
                        Add Step
                    </button>
                </form>
                <Link
                    to={`/project/${projectId}`}
                    className="btn-primary">
                    Finish
                </Link>
            </div>
        </div>
    )
}

export default StepForm;