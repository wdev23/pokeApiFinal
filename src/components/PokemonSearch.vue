<template>
  <div class="pokemon-search">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search Pokémon..."
      class="search-input"
    />

    <div class="pokemon-grid">
      <div
        v-for="pokemon in filteredPokemons"
        :key="pokemon.name"
        class="pokemon-card"
      >
        <img v-if="pokemon.image" :src="pokemon.image" :alt="pokemon.name" />
        <h3>{{ pokemon.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { fetchPokemons } from "../services/pokemonService";

interface Pokemon {
  name: string;
  url: string;
  image?: string;
}

export default defineComponent({
  name: "PokemonSearch",
  setup() {
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

    onMounted(() => {
      loadPokemons();
    });

    return {
      searchTerm,
      filteredPokemons,
    };
  },
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

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.pokemon-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

.pokemon-card img {
  width: 96px;
  height: 96px;
}

.pokemon-card h3 {
  margin: 10px 0;
  text-transform: capitalize;
}
</style>
