<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import { fetchWeather } from "./service/apiService"

const inputValue = ref(""); 
const weatherData =ref<WeatherData | null>(null); 

interface WeatherData {
  name: string; 
  main: {
    temp: number; 
  };
  weather: {
    description: string;
  }[];
}

const handleButtonClick = async () => {
  try {
    const data = await fetchWeather(inputValue.value);
    weatherData.value = {
      name: data.name,
      main: data.main, 
      weather: data.weather
    };
     
  } catch (error){
    console.error(error)
  }
};


</script>

<template>
  <div>
    <div>
      <input class="city-input" placeholder="Search city..." v-model="inputValue" @keypress.enter="handleButtonClick">
      <button class="submit-button" type="submit" @click="handleButtonClick" >Search</button>
    </div>
    <div v-if="weatherData!=null" class="current-weather">
      <p>City: {{ weatherData.name }}</p>
      <p>Temprature: {{ weatherData.main.temp}}</p>
      <p>Weather:</p>

    </div>
    <RouterView />
  </div>
  
</template>

<style scoped>

</style>
