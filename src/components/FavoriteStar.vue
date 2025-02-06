<template>
  <button class="favorite-btn" @click="$emit('toggle')">
    {{ isFavorite ? "★" : "☆" }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FavoriteStar",
  props: {
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.favorite-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #ffd700;
  padding: 0 5px;
}
</style>
