import React from "react";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import styles from './LoginForm.module.css';

import LoadingSpinner from "./LoadingSpinner";

const LOGIN_API = 'https://pizza-recipe-app.herokuapp.com/login';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let user = {
            username: username,
            password: password
        }

        fetch(LOGIN_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                // cookies expire in 3 hours
                document.cookie = `token=${data.token};max-age=60*60";`;
                document.cookie = `username=${data.user.username};max-age=60*60";`;
                document.cookie = `userId=${data.user.id};max-age=60*60;`;
                document.cookie = `loggedIn=true;max-age=60*60";`;
                setIsLoading(false);
                navigate('/dashboard');
            })
            .catch(error => {
                setIsLoading(false);
                setLoginError('Unable to login, please try again');
                console.log('Failed to Login User: ', error)
            })
    }

    return (
        <div className={styles.login}>
            <form>
                <h2>Login</h2>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setLoginError('');
                    }}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setLoginError('');
                    }}
                    required
                />
                <button
                    className="btn-primary"
                    onClick={(e) => handleSubmit(e)}>
                    Submit
                </button>
                <Link to={'/register'}>Register</Link>
                {
                    loginError !== '' && (
                        <p className="messageError">{loginError}</p>
                    )
                }
            </form>
            {
                isLoading && (
                    <LoadingSpinner message="Loading..." />
                )
            }

        </div>
    )
}

export default LoginForm;