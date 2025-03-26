"use client";
import Image from "next/image";
import BgImage from "@/assets/wallpapersden.com_pokemon-hd-cool-art_1920x1080.jpg";
import PokeCard from "@/components/PokeCard";
import {
  getEvolutionApi,
  getPokemonApi,
  LocationApi,
  PokemonNameApi,
} from "@/lib/DataServices";
import { useEffect, useState } from "react";
import { PokemonInterface } from "@/interface/interface";

export default function Home() {
  const [searchPokemon, setSearchPokemon] = useState<string>("Bulbasaur");
  const [pokemonData, setPokemonData] = useState<PokemonInterface | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokemonInfo = await PokemonNameApi(searchPokemon);
        const locationInfo = await LocationApi(pokemonInfo.id);
        const speciesInfo = await getPokemonApi(searchPokemon);
        const evolutionInfo = await getEvolutionApi(
          speciesInfo.evolution_chain.url
        );

        const pokemonDetails: PokemonInterface = {
          id: pokemonInfo.id,
          name: pokemonInfo.name,
          types: pokemonInfo.types.map((type) => type.type.name),
          image: pokemonInfo.sprites.front_default,
          shinyImage: pokemonInfo.sprites.front_shiny,
          location:
            locationInfo.length > 0
              ? locationInfo[0].location_area.name
              : "N/A",
          moves: pokemonInfo.moves.map((move) => move.move.name),
          abilities: pokemonInfo.abilities.map(
            (ability) => ability.ability.name
          ),
          evolutions: evolutionInfo.chain.evolves_to.map(
            (evo) => evo.species.name
          ),
        };

        setPokemonData(pokemonDetails);
        console.log(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, [searchPokemon]);

  return (
    <div className="min-h-screen w-full relative">
      <div className="fixed inset-0">
        <Image
          src={BgImage}
          alt="Pokémon Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative w-full h-full min-h-screen p-6">
        {pokemonData && <PokeCard pokemon={pokemonData} />}
      </div>
    </div>
  );
}
