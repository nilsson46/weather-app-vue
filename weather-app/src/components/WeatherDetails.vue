<template>
    <div class="weather-details">
        <div>Temperatur: {{ temperature }} °C</div>
        <div>Väderförhållanden: {{ conditions }}</div>
        <div>Vindhastighet: {{windSpeed}} m/s</div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
    temperature: Number,
    conditions: String, 
    windSpeed: Number,
});
</script>

