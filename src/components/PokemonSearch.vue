<template>
  <div class="pokemon-search">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search Pokémon..."
      class="search-input"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { fetchPokemons } from "../services/pokemonService";
import type { Pokemon } from "../services/pokemonService";

const emit = defineEmits<{
  (e: "search", pokemons: Pokemon[]): void;
}>();

const pokemons = ref<Pokemon[]>([]);
const searchTerm = ref("");

const loadPokemons = async () => {
  const data = await fetchPokemons();
  pokemons.value = data;
};

const filteredPokemons = computed(() => {
  return pokemons.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

watch(filteredPokemons, (newValue) => {
  emit("search", newValue);
});

onMounted(async () => {
  await loadPokemons();
  emit("search", pokemons.value);
});
</script>

<style scoped>
.pokemon-search {
  padding: 20px;
}

.search-input {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
</style>
