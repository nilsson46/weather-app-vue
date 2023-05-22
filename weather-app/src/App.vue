<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import { fetchWeather } from "./service/apiService"

const inputValue = ref(""); 
const weatherData =ref({}); 

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
    weatherData.value = await fetchWeather(inputValue.value)
    console.log(weatherData.value);
    
    const{name, main, weather} = weatherData.value as WeatherData;
    console.log("City: ", name);
    console.log("Temprature: " , main.temp);
    console.log("Description: ", weather[0].description);
     
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
  
    <RouterView />
  </div>
  
</template>

<style scoped>

</style>
