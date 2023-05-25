<template>
    <div>
      <button v-for="search in recentSearches" :key="search" @click="selectCity(search)">
        {{ search }}
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  
  const recentSearches = ref<string[]>([]);
  
  const loadRecentSearches = () => {
    const searches = localStorage.getItem("recentSearches");
    if (searches) {
      recentSearches.value = JSON.parse(searches);
    }
  };
  
  const selectCity = (cityName: string) => {
    console.log("Selected city:", cityName);
  };
  
  onMounted(loadRecentSearches);
  </script>
