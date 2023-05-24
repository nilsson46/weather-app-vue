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


const emit = defineEmits(["city-searched"]);

const inputValue = ref("");
const data = ref("")


/*const handleButtonClick = () => {
  if (props.onSearch) {
    props.onSearch(inputValue.value);
  }
}; */

const handleSearch = () => {
  const searchValue = inputValue.value.trim();
  if (!searchValue) {
    // Handle empty search value
    return;
  }
  emit("city-searched", searchValue);
};
</script>