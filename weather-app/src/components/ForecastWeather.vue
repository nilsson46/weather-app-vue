<template>
    <div>Hej</div>
</template>

<script setup lang="ts">

import { ref, onMounted } from "vue"
import { fetchForecastWeather, fetchGeoLocation } from "../service/apiService";

const forecastData = ref([])

onMounted (async () => {
try{
    const {lat, lon } = await fetchGeoLocation(city);
    const result = await fetchForecastWeather(lat, lon);
    if(result) {
        forecastData.value = result.list.slice(0,6);
    }
} catch{
    console.error(Error);
    
}
})
</script>

<style>

</style>