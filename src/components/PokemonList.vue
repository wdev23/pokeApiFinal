<template>
  <div class="list">
    <div v-if="isLoading" class="loading">Loading Pokémon...</div>
    <div v-else v-for="pokemon in pokemons" :key="pokemon.name" class="card">
      <img :src="pokemon.image" class="image" :alt="pokemon.name" />
      <h2 class="name">{{ pokemon.name }}</h2>
      <svg
        viewBox="0 0 300 275"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        class="star"
        :style="{ fill: favorites.has(pokemon.name) ? '#fa2356' : 'none' }"
        @click="toggleFavorite(pokemon.name)"
      >
        <polygon
          stroke="#fff"
          stroke-width="20"
          points="150,25 179,111 269,111 197,165  223,251 150,200 77,251 103,165 31,111 121,111"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchPokemons } from "../services/pokemonService";

const pokemons = ref([]);
const favorites = ref(new Set());
const isLoading = ref(true);

const toggleFavorite = (pokemonName: string) => {
  if (favorites.value.has(pokemonName)) {
    favorites.value.delete(pokemonName);
  } else {
    favorites.value.add(pokemonName);
  }
};

onMounted(async () => {
  try {
    pokemons.value = await fetchPokemons();
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 20px;
  justify-items: stretch;
  max-width: 800px;
  margin: 0 auto;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 7px;
  box-shadow: 0 4px 16px rgb(0 0 0 / 20%);
}

.image {
  max-width: 150px;
}

.name {
  margin-bottom: 10px;
  color: #000;
  text-align: center;
  text-transform: capitalize;
  font-weight: 500;
}

.star {
  width: 40px;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 40px;
  cursor: pointer;
  background-color: #fa2356;
  box-shadow: 0 4px 16px rgb(0 0 0 / 20%);
  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.star:hover {
  background-color: #d21d48;
}

.star:active {
  background-color: #fa2356;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
  color: #666;
}
</style>
