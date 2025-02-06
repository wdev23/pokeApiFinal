import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorite", {
  state: () => ({
    favorites: [] as string[],
  }),

  actions: {
    toggleFavorite(pokemonName: string) {
      const index = this.favorites.indexOf(pokemonName);
      if (index === -1) {
        this.favorites.push(pokemonName);
      } else {
        this.favorites.splice(index, 1);
      }
    },
  },
});
