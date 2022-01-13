import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './LoginForm.module.css';

const LOGIN_API = 'https://pizza-recipe-app.herokuapp.com/login';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
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
            .then(token => {
                document.cookie = `loggedIn=true`;
                document.cookie = `token=${token}`;
                document.cookie = `username=${username}`;
                navigate('/dashboard');
            })
            .catch(error => {
                setLoginError('Unable to login, please try again');
                console.log('Failed to Login User: ', error)
            })
    }

    return (
        <div className={styles.login}>
            <form>
                <h2>Login</h2>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="username">Username</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <button onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
            {
                loginError !== '' && (
                    <p>{loginError}</p>
                )
            }
        </div>
    )
}

export default LoginForm;