import React from "react";
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { getToken } from "../helpers";

const STEP_API = `https://pizza-recipe-app.herokuapp.com/steps`;

const StepForm = ({ handleUpdateSteps, newRecipeId }) => {
    const [step, setStep] = useState({
        step: '',
        recipe_id: newRecipeId,
        step_order: ''
    });

    const { projectId } = useParams();

    useEffect(() => {
        setStep({ ...step, recipe_id: newRecipeId })
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
            .then(data => {
                handleUpdateSteps(step);
                setStep({
                    step: '',
                    recipe_id: newRecipeId,
                    step_order: ''
                })
            })
            .catch(error => console.log('Failed to add step: ', error))
    }

    return (
        <form>
            <label htmlFor="step">Step</label>
            <input type="text" name="step" id="step" value={step.step} onChange={(event) => setStep({ ...step, step: event.target.value })} />
            <button onClick={(event) => handleAddStep(event)}>Add Step</button>
            <Link to={'/dashboard'}>Finish</Link>
        </form>
    )
}

export default StepForm;