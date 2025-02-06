export interface Pokemon {
  name: string;
  url: string;
  image?: string;
}

interface PokemonData {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export const fetchPokemons = async () => {
  try {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
    const response = await fetch(url);
    const json: PokemonData = await response.json();

    // Fetch detailed information for each Pokemon
    const detailedPokemons = await Promise.all(
      json.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        const detailData = await detailResponse.json();
        return {
          ...pokemon,
          image: detailData.sprites.front_default,
        };
      })
    );

    return detailedPokemons;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return [];
  }
};
