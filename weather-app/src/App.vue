<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { RouterLink, RouterView } from 'vue-router';
import {
  fetchCurrentWeather,
  fetchWeatherDetails,
  fetchGeoLocation,
  CurrentWeatherData,
  WeatherDetailsData,
  fetchForecastData,
  ForecastWeatherData
} from "./service/apiService";
import NavBar from "./components/NavBar.vue";
import SearchBar from "./components/SearchBar.vue";
import WeatherDetails from "./components/WeatherDetails.vue";
import ForecastWeather from "./components/ForecastWeather.vue";
import OldSearches from "./components/OldSearches.vue";
    const inputValue = ref(""); 
    const currentWeather =ref<CurrentWeatherData | null>(null); 
    const weatherDetails = ref<WeatherDetailsData | null>(null); 
    const forecastData = ref<ForecastWeatherData | null>(null);
    const recentSearches = ref<string[]>([])
    const showWeatherDetails = ref(false);
    
const handleWeatherDetail = async () => {
  try {
    const getLocation = await fetchGeoLocation(currentWeather.value?.name || "");
    const data = await fetchWeatherDetails(getLocation.lat, getLocation.lon);
    weatherDetails.value ={
      name: data.name, 
      main: data.main, 
      wind: data.wind,
      weather: data.weather,
    }
   
  } catch (error) {
    console.error("Error in handleWeather Detail:",error);
  }
}; 

const toggleDetails = () => {
  showWeatherDetails.value = !showWeatherDetails.value;
  if (showWeatherDetails.value && !weatherDetails.value){
    handleWeatherDetail();
  }
};

const onCitySearched = async (cityName) => {
  console.log("City name received in App.vue:", cityName);
  try {
    const location = await fetchGeoLocation(cityName);
    if (!location) {
      // Handle no location found
      return;
    }

    recentSearches.value.unshift(cityName);

    if(recentSearches.value.length >3) {
      recentSearches.value.pop();
    }

    const currentWeatherData = await fetchCurrentWeather(location.lat, location.lon);
    currentWeather.value = {
      name: currentWeatherData.name,
      main: currentWeatherData.main,
      weather: currentWeatherData.weather
    };

    const weatherDetailsData = await fetchWeatherDetails(location.lat, location.lon);
    weatherDetails.value = {
      name: weatherDetailsData.name,
      main: weatherDetailsData.main,
      wind: weatherDetailsData.wind,
      weather: weatherDetailsData.weather,
    };

    const forecastWeatherData = await fetchForecastData(location.lat, location.lon);
    forecastData.value = forecastWeatherData;
    console.log(forecastData.value);
  } catch (error) {
    console.error(error);
  }
};

const loadRecentSearches = () => {
  const searches = localStorage.getItem("recentSearches");
  if(searches){
    recentSearches.value = JSON.parse(searches);
  }
};

loadRecentSearches();
    
</script>

<template>
  <div id ="app">
    <nav-bar></nav-bar>
    <OldSearches></OldSearches>
    <search-bar @city-searched="onCitySearched"> </search-bar>
    
    <div v-if="currentWeather!==null" class="current-weather">
      <img :src="'http://openweathermap.org/img/wn/' + currentWeather.weather[0].icon + '.png'" />
      <p>Stad: {{ currentWeather.name }}</p>
      <p>Tempratur: {{ currentWeather.main.temp}} °C</p>
      <p>Väderförhållanden: {{ currentWeather.weather[0].description }}</p>
      <button class="weather-details" @click="toggleDetails">Deatails</button>

    </div>  

    <WeatherDetails 
    v-if="weatherDetails && showWeatherDetails"
    :temperature="weatherDetails.main.temp"
    :conditions="weatherDetails.weather[0].description"
    :wind-speed="weatherDetails.wind.speed"
    ></WeatherDetails>
    <div>
      <ForecastWeather v-if="forecastData !== null" :forecastData="forecastData">
      </ForecastWeather>
    </div>
    <RouterView />
  </div>
  
</template>

<style scoped>

</style>
