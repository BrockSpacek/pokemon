import { PokemonData, PokemonEvolutionData, PokemonLocationData, PokemonSpeciesData } from "@/interface/interface";

export const PokemonNameApi = async (names: string) => {
  const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${names}`);
  const data: PokemonData = await promise.json();
  console.log(data);
  return data;
};

export const LocationApi = async (idOfPokemon: number) => {
  const promise = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${idOfPokemon}/encounters`
  );
  const locationData: PokemonLocationData[] = await promise.json();
  console.log(locationData);
  return locationData;
};

export const getPokemonApi = async (pokemon: string) => {
  const fetchData = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`
  );
  const data: PokemonSpeciesData = await fetchData.json();
  console.log(data)
  return data;
};
export const getEvolutionApi = async (evolutionChain: string) => {
  const fetchData = await fetch(evolutionChain);
  const data: PokemonEvolutionData = await fetchData.json();
  console.log(data)
  return data;
};
