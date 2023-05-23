<script lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import { fetchCurrentWeather, fetchWeatherDetails, fetchGeoLocation, CurrentWeatherData, WeatherDetailsData } from "./service/apiService"
import { defineComponent } from "vue"; 
import NavBar from "./components/NavBar.vue"
import SearchBar from "./components/SearchBar.vue";

const inputValue = ref(""); 
const currentWeather =ref<CurrentWeatherData | null>(null); 
const weatherDetails = ref<WeatherDetailsData | null>(null); 



export default defineComponent({
  name: "App",
  components:{
    NavBar,
    SearchBar,
  }, 
  setup(){
    const handleSearch = async (searchValue: string) => {
  try {
    const getLocation = await fetchGeoLocation(searchValue);
    const data = await fetchCurrentWeather(getLocation.lat, getLocation.lon);
    currentWeather.value = {
      name: data.name,
      main: data.main,
      weather: data.weather,
    };
  } catch (error) {
    console.error(error);
  }
};

return { handleSearch, currentWeather, weatherDetails, toggleDetails };
  }
})



const handleWeatherDetail = async () => {
  try{
    const getLocation = await fetchGeoLocation(inputValue.value);
    const data = await fetchWeatherDetails(getLocation.lat, getLocation.lon);

    weatherDetails.value ={
      name: data.name,
      main: data.main,
      wind: data.wind,
      weather: data.weather
    };

  }catch(error){
    console.error(error)
  }
};

const toggleDetails = () => {
  if(weatherDetails.value){
    weatherDetails.value = null;
  } else {
    handleWeatherDetail();
  }
};


</script>

<template>
  <div id ="app">
    <nav-bar></nav-bar>
    <search-bar :onSearch="handleSearch"> </search-bar>
    
    <div v-if="currentWeather!=null" class="current-weather">
      <p>City: {{ currentWeather.name }}</p>
      <p>Temprature: {{ currentWeather.main.temp}}</p>
      <p>Weather: {{ currentWeather.weather[0].description }}</p>
      <button class="weather-deatils" @click="toggleDetails">Deatails</button>

    </div>

    <div v-if="weatherDetails != null" class="weather-details">
      <p>City: {{weatherDetails.name}}</p>
      <p>Temperature: {{weatherDetails.main.temp}}</p>
      <p>Feels like: {{weatherDetails.main.feels_like}}</p>
      <p>Pressure: {{weatherDetails.main.pressure}}</p>
      <p>Wind speed: {{weatherDetails.wind.speed}}</p>
      <p>Weahter: {{weatherDetails.weather[0].main}}</p>
    </div>
    <RouterView />
  </div>
  
</template>

<style scoped>

</style>
