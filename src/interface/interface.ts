// Interface for Pokémon general data
export interface PokemonData {
    id: number;
    name: string;
    types: { type: { name: string } }[];
    sprites: { 
      front_default: string; 
      front_shiny: string;
    };
    moves: { move: { name: string } }[];
    abilities: { ability: { name: string } }[];
  }
  
  
  export interface PokemonLocationData {
    location_area: { name: string };
  }
  
  
  export interface PokemonSpeciesData {
    evolution_chain: { url: string };
  }
  
  
  export interface EvolutionChain {
    species: { name: string };
    evolves_to: EvolutionChain[];
  }
  
  export interface PokemonEvolutionData {
    chain: EvolutionChain;
  }
  
  
  export interface PokemonInterface {
    id: number;
    name: string;
    types: string[];
    image: string;
    shinyImage: string;
    location: string;
    moves: string[];
    abilities: string[];
    evolutions: string[];
  }