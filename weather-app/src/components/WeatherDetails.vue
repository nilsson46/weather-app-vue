<template>
    <div class="weather-details">
        <div>Temperatur: {{ props.temperature }} °C</div>
        <div>Väderförhållanden: {{ props.conditions }}</div>
        <div>Vindhastighet: {{ props.windSpeed}} m/s</div>

    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

export interface WeatherDetails{
    weather: {desription: string } [];
    main: { temp: number }
    
}
const props = defineProps({
    temperature: {
        type: Number,
        required: true, 
    }, 

    conditions:{
        type: String,
        required: true,
    }, 
    windSpeed:{ 
        type: Number,
        required: true 
    },
})
</script>

