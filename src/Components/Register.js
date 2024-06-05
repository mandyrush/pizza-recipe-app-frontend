import React from "react";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {config} from '../Constants';

import styles from './Register.module.css';
import Header from "./Header";
import LoadingSpinner from './LoadingSpinner';

const REGISTER_API = `${config.url}/users`;

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let user = {
            username: username,
            password: password,
            confirmPassword: confirmPassword
        }

        fetch(REGISTER_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (response.ok) {
                    setIsLoading(false);
                    navigate('/');
                } else {
                    setIsLoading(false);
                    setRegisterError('Unable to register, please try again');
                }
            })
            .catch(error => {
                console.log('Failed to Register User: ', error)
            })
    }

    return (
        <main className={styles.register}>
            <Header title={'Register'} />
            <section className="container">
                <form>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        className="btn-primary"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Submit
                    </button>
                    <Link to={'/'}>Cancel</Link>
                </form>
                {
                    isLoading && (
                        <LoadingSpinner
                            message={'Registering...'}
                        />
                    )
                }
                {
                    registerError !== '' && (
                        <p>{registerError}</p>
                    )
                }
            </section>
        </main>
    )
}

export default Register;