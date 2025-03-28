"use client";
import Image from "next/image";
import BgImage from "@/assets/wallpapersden.com_pokemon-hd-cool-art_1920x1080.jpg";
import PokeCard from "@/components/PokeCard";
import { getEvolutionApi, getPokemonApi, LocationApi, PokemonNameApi } from "@/lib/DataServices";
import { useEffect, useState } from "react";
import { PokemonInterface } from "@/interface/interface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getLocalStorage, saveToLocalStorageByName, removeFromLocalStorage } from "@/lib/DataServices";

export default function Home() {
  const [input, setInput] = useState<string | number>("");
  const [searchItem, setSearchItem] = useState<string | number>(1);
  const [pokemonData, setPokemonData] = useState<PokemonInterface | null>(null);
  const [isFavoriteToggled, setIsFavoriteToggled] = useState<boolean>(false);
  const [favoritesList, setFavoritesList] = useState<string[]>([]);

  const handleSearchClick = () => {
    if (!input) return;

    const searchValue = isNaN(Number(input)) ? input : Number(input);
    if (
      typeof searchValue === "number" &&
      (searchValue < 1 || searchValue > 649)
    ) {
      alert("Pokémon ID must be between 1 and 649.");
      return;
    }

    setSearchItem(searchValue);
    setInput("");
  };

  const handleRandomClick = () => {
    const randomNumber = Math.floor(Math.random() * 649) + 1;
    setSearchItem(randomNumber);
    setInput("");
  };

  const toggleFavorites = () => {
    setIsFavoriteToggled(!isFavoriteToggled);
    console.log(favoritesList);
  };

  const updateFavoritesList = () => {
    const list = getLocalStorage();
    setFavoritesList(list);
  };

  useEffect(() => {
  
    const fetchPokemon = async () => {
      try {
        const pokemonInfo = await PokemonNameApi(searchItem);
        const locationInfo = await LocationApi(pokemonInfo.id);
        const speciesInfo = await getPokemonApi(searchItem);
        const evolutionInfo = await getEvolutionApi(speciesInfo.evolution_chain.url);

        const pokemonDetails: PokemonInterface = {
          id: pokemonInfo.id,
          name: pokemonInfo.name,
          types: pokemonInfo.types.map((type) => type.type.name),
          image: pokemonInfo.sprites.front_default,
          shinyImage: pokemonInfo.sprites.front_shiny,
          location: locationInfo.length > 0 ? locationInfo[0].location_area.name : "N/A",
          moves: pokemonInfo.moves.map((move) => move.move.name),
          abilities: pokemonInfo.abilities.map((ability) => ability.ability.name),
          evolutions: evolutionInfo.chain.evolves_to.map((evo) => evo.species.name),
        };

        setPokemonData(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    if (searchItem) {
      fetchPokemon();
    }
  }, [searchItem]);

  useEffect(() => {
    if (isFavoriteToggled) {
      updateFavoritesList();
    }
  }, [isFavoriteToggled]);

  return (
    <div className="w-full">
      <div className="fixed inset-0">
        <Image src={BgImage} alt="Pokémon Background" fill className="object-cover" priority />
      </div>

      <div className="mt-20">
        <div className="flex justify-center">
          <Input
            placeholder="Enter Pokemon Name or ID..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="relative bg-[#b03535] border-2 border-black text-white rounded-[15px] h-12 text-xl lg:w-[30%] md:w-[50%] w-[75%] placeholder:text-gray-200"
          />
        </div>

        <div className="flex justify-center mt-3 w-full">
          <div className="flex lg:w-[30%] md:w-[50%] w-[75%]">
            <Button className="relative bg-[#b03535] text-white rounded-[15px] px-4 md:text-lg text-sm flex-1 mx-1 hover:bg-white hover:text-[#b03535]" onClick={handleSearchClick}>
              Search
            </Button>
            <Button className="relative bg-[#b03535] text-white rounded-[15px] px-4 md:text-lg text-sm flex-1 mx-1 hover:bg-white hover:text-[#b03535]" onClick={handleRandomClick}>
              Random
            </Button>
            <Button className="relative bg-[#b03535] text-white rounded-[15px] px-4 md:text-lg text-sm flex-1 mx-1 hover:bg-white hover:text-[#b03535]" onClick={toggleFavorites}>
              Favorites
            </Button>
          </div>
        </div>
      </div>

     
      <div className={`${isFavoriteToggled ? 'block' : 'hidden'}`}>
  <div className="relative text-white bg-[#b03535] lg:w-[25%] md:w-[40%] w-[50%] rounded-2xl lg:-mt-[95px] mt-5 text-center lg:ml-14 mx-auto py-2">
    <h2 className="underline lg:text-3xl text-xl">Favorited Pokémon</h2>
    <div className="lg:text-2xl md:text-lg py-2 overflow-y-auto max-h-30">
      {favoritesList.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul>
          {favoritesList.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
</div>

      <div className="relative w-[90%] p-6 lg:mt-32 mt-24 mx-auto">
        {pokemonData && <PokeCard pokemon={pokemonData} />}
      </div>
    </div>
  );
}
