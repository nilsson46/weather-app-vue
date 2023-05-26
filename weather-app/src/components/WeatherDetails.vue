<template>
    <div class="weather-details">
        <div>Känns som: {{ props.main.feels_like }} °C</div>
        <div>Vindhastighet: {{ props.wind.speed}} m/s</div>
        <div>Tryck: {{ props.main.pressure }} hPa</div>
        <div> Fuktighet: {{ props.main.humidity }}</div>

    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { WeatherDetailsData } from "../modules/types";

    

const props = defineProps<WeatherDetailsData>();  

</script>
<style>
.weather-details{
    background-color: rgb(121, 234, 251);
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
