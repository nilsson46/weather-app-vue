import axios from "axios";

export const fetchWeather = async (city: string) => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=eae526c0c59da830ba1afac8ab0f3347`);
    const cities = response.data;

    if (Array.isArray(cities) && cities.length > 0) {
      const geoResult = cities[0];
      const { lat, lon } = geoResult;

      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eae526c0c59da830ba1afac8ab0f3347`);
      console.log(weatherResponse.config.url);
      const weatherData = weatherResponse.data;

      return weatherData;
    } else {
      throw new Error("No result found.");
    }
  } catch (error) {
    throw new Error("Failed to fetch weather data.");
  }
};