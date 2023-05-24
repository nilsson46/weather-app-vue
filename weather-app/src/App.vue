<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from 'vue-router';
import { 
  fetchCurrentWeather, 
  fetchWeatherDetails, 
  fetchGeoLocation, 
  CurrentWeatherData, 
  WeatherDetailsData } from "./service/apiService";
import { defineComponent } from "vue";
import NavBar from "./components/NavBar.vue";
import SearchBar from "./components/SearchBar.vue";
import WeatherDetails from "./components/WeatherDetails.vue";
/*defineComponent({
  name: "App",
  components:{
    NavBar,
    SearchBar,
    WeatherDetails,
  }, 
  setup(){ */
    const inputValue = ref(""); 
    const currentWeather =ref<CurrentWeatherData | null>(null); 
    const weatherDetails = ref<WeatherDetailsData | null>(null); 
    


const handleWeatherDetail = async () => {
  try {
    const getLocation = await fetchGeoLocation(currentWeather.value?.name || "");
    const data = await fetchWeatherDetails(getLocation.lat, getLocation.lon);

    weatherDetails.value = {
      name: data.name,
      main: data.main,
      wind: data.wind,
      weather: data.weather,
    };
  } catch (error) {
    console.error("Error in handleWeather Detail:",error);
  }
}; 

const toggleDetails = () => {
  if(weatherDetails.value){
    weatherDetails.value = null;
  } else {
    handleWeatherDetail();
  }
};

const onCitySearched = async (cityData) => {
  console.log("City data received in App.vue:", cityData);
  try{
    const data = await fetchCurrentWeather(cityData.lat, cityData.lon);
    currentWeather.value={
      name: data.name,
      main: data.main, 
      weather: data.weather
    };
  } catch(error){
    console.error(error);
  }
};




 /* return { 
    handleSearch, 
    currentWeather, 
    weatherDetails, 
    toggleDetails, 
    inputValue,
    }; */
    

</script>

<template>
  <div id ="app">
    <nav-bar></nav-bar>
    <search-bar @city-searched="onCitySearched"> </search-bar>
    
    <div v-if="currentWeather!=null" class="current-weather">
      <img v-bind:src="'http://openweathermap.org/img/w/' +  + '.png' "  />
      <p>Stad: {{ currentWeather.name }}</p>
      <p>Tempratur: {{ currentWeather.main.temp}}</p>
      <p>Väderförhållanden: {{ currentWeather.weather[0].description }}</p>
      <button class="weather-details" @click="toggleDetails">Deatails</button>

    </div>

    <weather-details
  v-if="weatherDetails !== null"
  :temperature="weatherDetails.main.temp"
  :conditions="weatherDetails.weather[0].main"
  :windSpeed="weatherDetails.wind.speed"
></weather-details>

    <forecast-weather></forecast-weather>
    <RouterView />
  </div>
  
</template>

<style scoped>

</style>
