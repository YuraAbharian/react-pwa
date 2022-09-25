import './App.css';
import {useState} from "react";
import {getCityWeather, getCityIcon} from "./api/weather";

function App() {
    const [weather, setWeather] = useState(null);
    const [query, setQuery] = useState('');

    const onChangeHandler = ({target: {value}}) => {
        setQuery(value);
    }
    const onKeyDownHandler = async ({key}) => {
        if (key === 'Enter') {
            const result = await getCityWeather(query);
            setWeather(await result.json());
        }
    }

    return (
        <main>
            <input type="text" value={query} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}
                   placeholder="Type city..."/>

            {weather && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div>
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img src={getCityIcon(weather.weather[0].icon)}
                             alt={weather.weather[0].description}/>
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </main>
    );
}

export default App;
