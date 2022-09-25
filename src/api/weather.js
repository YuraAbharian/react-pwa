const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '4422bc82cee4c89ac88d5712b935e15a';

export const getCityWeather = async (city) => {
    const url = new URL(BASE_URL);
    url.searchParams.set('q', city);
    url.searchParams.set('units', 'metric');
    url.searchParams.set('appid', API_KEY);

    return fetch(url)
}
export const getCityIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;
