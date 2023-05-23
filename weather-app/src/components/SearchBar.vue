<template>
    <div>
        <input class="city-input" placeholder="Search city..." v-model="inputValue" @keypress.enter="handleButtonClick">
        <button class="submit-button" type="submit" @click="handleButtonClick" >Search</button>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  onSearch: Function,
});

const inputValue = ref("");
const handleButtonClick = () => {
  if (props.onSearch) {
    props.onSearch(inputValue.value);
  }
};
</script>