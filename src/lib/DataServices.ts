import { PokemonData, PokemonEvolutionData, PokemonLocationData, PokemonSpeciesData } from "@/interface/interface";

export const PokemonNameApi = async (names: string | number) => {
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

export const getPokemonApi = async (pokemon: string | number) => {
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

function saveToLocalStorageByName(name: string) {
    if (typeof window === 'undefined') return; 

    const namesArr = getLocalStorage();

    if (!namesArr.includes(name)) {
        namesArr.push(name);
    }

    localStorage.setItem('Names', JSON.stringify(namesArr));
}

 function getLocalStorage() {
    if (typeof window === 'undefined') return []; 

    const localStorageData = localStorage.getItem('Names');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(name: string) {
    if (typeof window === 'undefined') return;

    const namesArr = getLocalStorage();

    const nameindex = namesArr.indexOf(name);

    if (nameindex !== -1) {
        namesArr.splice(nameindex, 1);
        localStorage.setItem('Names', JSON.stringify(namesArr));
    }
}

export { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage };