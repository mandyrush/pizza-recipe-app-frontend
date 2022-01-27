import React from "react";
import { useEffect, useState } from "react";

import styles from './Weather.module.css';

const WEATHER_API = 'https://pizza-recipe-app.herokuapp.com/weather';

const Weather = () => {
    const [currentWeather, setCurrentWeather] = useState('');

    useEffect(() => {
        getUserCoordinates();
    }, [])

    const getUserCoordinates = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition, getError);
        } else {
            console.log('Unable to get location');
        }
    }

    const getPosition = (pos) => {
        let latitude = pos.coords.latitude.toFixed(5);
        let longitude = pos.coords.longitude.toFixed(5);

        fetch(`${WEATHER_API}?&latitude=${latitude}&longitude=${longitude}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setCurrentWeather(data))
            .catch(error => console.log('Error: ', error))
    }

    const getError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log('User denied the request for Geolocation.')
                break;
            case error.POSITION_UNAVAILABLE:
                console.log('Location information is unavailable.')
                break;
            case error.TIMEOUT:
                console.log('The request to get user location timed out.')
                break;
            default:
                console.log('An unknown error occurred.')
        }
    }

    return (
        <div className={styles.banner}>
            {currentWeather && (
                <div>
                    <p>Current Temperature: {currentWeather.current.temp_f}&deg;F - Humidity: {currentWeather.current.humidity}%</p>
                </div>
            )}
        </div>
    )
}

export default Weather;