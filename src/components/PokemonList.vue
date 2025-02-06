<template>
  <div class="pokemon-list">
    <h1>Pokémon List</h1>
    <PokemonSearch />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PokemonSearch from "./PokemonSearch.vue";

export default defineComponent({
  name: "PokemonList",
  components: {
    PokemonSearch,
  },
});
</script>

<style scoped>
.pokemon-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}
</style>
