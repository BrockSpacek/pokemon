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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="w-full">
      <div className="fixed inset-0">
        <Image
          src={BgImage}
          alt="Pokémon Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-20">
        <div className="flex justify-center">
          <Input placeholder="Enter Pokemon..." className="relative bg-[#b03535] text-white rounded-[15px] text-xl lg:w-[30%] md:w-[50%] w-[70%] placeholder:text-gray-300" />
        </div>
        <div className="flex justify-center mt-3">
          <Button className="relative bg-[#b03535] text-white rounded-[15px] px-4 text-lg mx-2 hover:bg-white hover:text-[#b03535]">Search</Button>
          <Button className="relative bg-[#b03535] text-white rounded-[15px] px-4 text-lg mx-2 hover:bg-white hover:text-[#b03535]"> Random </Button>
          <Button className="relative bg-[#b03535] text-white rounded-[15px] px-4 text-lg mx-2 hover:bg-white hover:text-[#b03535]"> Favorites </Button>
        </div>
      </div>

      <div className="relative w-[90%] p-6 lg:mt-44 mt-32 mx-auto">
        {pokemonData && <PokeCard pokemon={pokemonData} />}
      </div>
    </div>
  );
}
