import axios from "axios";

interface GeoLocation {
  lat: number; 
  lon: number;
}

interface CurrentWeatherData {

}

interface WeatherForecastData{

}

export const fetchGeoLocation = async (city: string): Promise<GeoLocation> => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=eae526c0c59da830ba1afac8ab0f3347`);
    const cities = response.data;

    if (Array.isArray(cities) && cities.length > 0) {
      return cities[0];
    } else {
      throw new Error("No result found.");
    }
  } catch (error) {
    throw new Error("Failed to fetch weather data.");
  }
};

export const fetchCurrentWeather = async (lat: number, lon: number): Promise<CurrentWeatherData> => {
  try {
    const response = await axios.get<CurrentWeatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eae526c0c59da830ba1afac8ab0f3347`);
    return response.data;
  } catch(error) {
    throw new Error("Failed to fetch current weather data")
  }
}; 

export const fetchWeatherForecast = async (lat: number, lon: number): Promise<WeatherForecastData> => {
  try {
    const response = await axios.get<WeatherForecastData>(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=eae526c0c59da830ba1afac8ab0f3347`);
    return response.data;
  } catch(error) {
    throw new Error("Failed to fetch forecast weather data")
  }
};
