import React, {useEffect, useState} from "react";
import axios from "axios";

const Weather = ({capital}) => {
    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        axios
            .get("http://api.weatherstack.com/current?access_key="
                + process.env.REACT_APP_API_KEY
                + "&query=" + capital)
            .then((response) => {
                setWeatherData(response.data.current)
            }).catch(() => setWeatherData({}))
    }, [capital]);

    if (weatherData !== undefined) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p><strong>Temperature: {weatherData.temperature} °C</strong></p>
                <img src={weatherData.weather_icons} alt={weatherData.weather_descriptions}/>
                <p><strong>Wind: </strong>{weatherData.wind_speed} MPH, direction: {weatherData.wind_dir}</p>

            </div>
        );
    } else {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p>No data</p>
            </div>)
    }

}

export default Weather;