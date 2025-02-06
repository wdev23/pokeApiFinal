<script setup lang="ts">
import PokemonList from "./components/PokemonList.vue";
</script>

<template>
  <h1 class="title">Pokedex</h1>
  <PokemonList />
</template>

<style>
body {
  padding: 20px;
  margin: 0;
  font-family: "Heebo", Helvetica, Arial, sans-serif;
  background-color: #1a1a1a;
  color: #fff;
}

h2 {
  margin: 0;
}

a {
  text-decoration: none;
}

img {
  display: block;
  width: 100%;
}

.title {
  text-align: center;
  color: #ffd700;
  font-weight: 300;
  font-size: 58px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
}
</style>
