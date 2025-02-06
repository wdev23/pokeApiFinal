<template>
  <div class="pokemon-list">
    <h1>Pokémon List</h1>
    <div class="filters">
      <PokemonSearch @search="updateFilteredPokemons" />
      <FavoriteFilter v-model="showFavoritesOnly" />
    </div>
    <div v-if="filteredPokemons.length" class="pokemon-grid">
      <div
        v-for="pokemon in filteredPokemons"
        :key="pokemon.name"
        class="pokemon-card"
      >
        <FavoriteStar
          :is-favorite="favoriteStore.favorites.includes(pokemon.name)"
          @toggle="toggleFavorite(pokemon.name)"
          class="favorite-star"
        />
        <img :src="pokemon.image" :alt="pokemon.name" />
        <h3>{{ pokemon.name }}</h3>
      </div>
    </div>
    <div v-else class="no-results">No Pokémon found</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import PokemonSearch from "./PokemonSearch.vue";
import FavoriteStar from "./FavoriteStar.vue";
import FavoriteFilter from "./FavoriteFilter.vue";
import { useFavoriteStore } from "../stores/favorite";
import type { Pokemon } from "../services/pokemonService";

const favoriteStore = useFavoriteStore();
const displayedPokemons = ref<Pokemon[]>([]);
const showFavoritesOnly = ref(false);

const filteredPokemons = computed(() => {
  if (!showFavoritesOnly.value) return displayedPokemons.value;
  return displayedPokemons.value.filter((pokemon) =>
    favoriteStore.favorites.includes(pokemon.name)
  );
});

const toggleFavorite = (pokemonName: string) => {
  favoriteStore.toggleFavorite(pokemonName);
};

const updateFilteredPokemons = (pokemons: Pokemon[]) => {
  displayedPokemons.value = pokemons;
};
</script>

<style scoped>
.pokemon-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #fff;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.pokemon-card {
  position: relative;
  padding: 15px;
  border: 1px solid #444;
  border-radius: 8px;
  text-align: center;
  background: #2a2a2a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.pokemon-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.favorite-star {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  z-index: 2;
}

.favorite-star span {
  color: #ccc;
  transition: color 0.2s ease;
  user-select: none;
}

.favorite-star span.is-favorite {
  color: gold;
}

.pokemon-card img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.pokemon-card h3 {
  margin: 10px 0;
  text-transform: capitalize;
}

.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 20px;
  margin: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.no-results {
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
  color: #888;
}
</style>
