import React from "react";
import { useState, useEffect } from 'react';

const STEP_API = `https://pizza-recipe-app.herokuapp.com/steps`;

const StepForm = ({ handleUpdateSteps, newRecipeId }) => {
    const [step, setStep] = useState({
        step: '',
        recipe_id: newRecipeId,
        step_order: ''
    });

    useEffect(() => {
        setStep({ ...step, recipe_id: newRecipeId })
    }, [newRecipeId])

    const handleAddStep = (event) => {
        event.preventDefault();
        fetch(STEP_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(step)
        })
            .then(data => {
                handleUpdateSteps(step);
            })
            .catch(error => console.log('Failed to add step: ', error))
        console.log('Step to add: ', step);
    }

    return (
        <form>
            <label htmlFor="step">Step</label>
            <input type="text" name="step" id="step" onChange={(event) => setStep({ ...step, step: event.target.value })} />
            <button onClick={(event) => handleAddStep(event)}>Add Step</button>
            <button>Finish</button>
        </form>
    )
}

export default StepForm;