<template>
  <button
    class="favorite-filter-btn"
    :class="{ active: modelValue }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span class="star">★</span> Favorites Only
  </button>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  "update:modelValue": [value: boolean];
}>();
</script>

<style scoped>
.favorite-filter-btn {
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid #ffd700;
  background: transparent;
  color: #ffd700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.favorite-filter-btn:hover {
  background: rgba(255, 215, 0, 0.1);
}

.favorite-filter-btn.active {
  background: #ffd700;
  color: #2a2a2a;
}

.star {
  font-size: 16px;
}
</style>
