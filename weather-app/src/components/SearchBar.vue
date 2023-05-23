<template>
    <div>
      <input
        class="city-input"
        placeholder="Search city..."
        v-model="inputValue"
        @keypress.enter="handleSearch"
      />
      <button
        class="submit-button"
        type="submit"
        @click="handleSearch"
      >
        Search
      </button>
    </div>
  </template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { fetchGeoLocation, fetchCurrentWeather } from "../service/apiService";

const emit = defineEmits(["city-searched"]);

const inputValue = ref("");



/*const handleButtonClick = () => {
  if (props.onSearch) {
    props.onSearch(inputValue.value);
  }
}; */

const handleSearch = async () => {
    console.log("HANDLE SEARCH");
    
      try {
    const searchValue = inputValue.value;
    console.log(searchValue);
    const getLocation = await fetchGeoLocation(searchValue);
    console.log(inputValue.value);
    
    const data = await fetchCurrentWeather(getLocation.lat, getLocation.lon);
        console.log("city:", data.name);
        
    emit("city-searched", getLocation);
   /* this.$emit("city-searched", getLocation);
    currentWeather.value = {
      name: data.name,
      main: data.main,
      weather: data.weather,
    }; */
  } catch (error) {
    console.error(error);
  }
};
</script>