<template>
    <div class="weather-details">
        <div>Känns som: {{ props.feels_like }} °C</div>
        <div>Vindhastighet: {{ props.windSpeed}} m/s</div>
        <div>Tryck: {{ props.pressure }} hPa</div>

    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

export interface WeatherDetails{
    main: { temp: number;
            feels_like: number;
            pressure: number; 
            humidity: number; }
    
}
const props = defineProps({  
    windSpeed:{ 
        type: Number,
        required: true 
    },
    feels_like:{
        type: Number, 
        required: true,
    },
    pressure:{
        type: Number, 
        required: true,
    },

})
</script>

