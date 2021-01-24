import { FORECAST_URL } from '../constants';

export const getForecast = async (lat, lng, lang) => {
  const weatherLink = `${FORECAST_URL}&lat=${lat}&lon=${lng}&lang=${lang ? 'ru' : 'en'}`;
  const response = await fetch(weatherLink);
  return response.json();
};

export function convertTemperature(temperature) {
  return (temperature * 1.8 + 32).toFixed(1);
}

export function getDegs(number) {
  if (number < 0 && Math.trunc(number) === 0) {
    return '-0';
  } return Math.trunc(number);
}

export function getMins(number) {
  if (number < 0) {
    return Math.trunc((-number % 1) * 100);
  }
  return Math.trunc((number % 1) * 100);
}

export const getItemFromLocalStorage = (itemName) => {
  if (localStorage.getItem(itemName)) {
    return JSON.parse(localStorage.getItem(itemName));
  }
  return false;
};

export const createWeatherSettings = (object) => ({
  location: object.city_name,
  temperature: object.data.map((res) => res.temp),
  weatherType: object.data[0].weather.description,
  windSpeed: object.data[0].wind_spd,
  humidity: object.data[0].rh,
  timeZone: object.timezone,
  icons: object.data.map((res) => res.weather.icon),
});
