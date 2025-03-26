"use client";
import React, { useState } from "react";
import Image from "next/image";
import ShinyBtn from "@/assets/Shiny_Image-removebg-preview.png";
import HeartBtn from "@/assets/Heart_Icon-removebg-preview.png";
import { PokemonInterface } from "@/interface/interface";

interface PokeCardProps {
  pokemon: PokemonInterface;
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
  const [isShiny, setIsShiny] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleShiny = () => {
    setIsShiny(!isShiny);
    console.log("Shiny button is toggled");
  }
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(pokemon.name);
  };

  return (
    <div className="bg-[#b03535b4] mt-44 w-full max-w-[80%] mx-auto rounded-[15px] p-6">
      <div className="flex justify-center items-center">
        <h1 className="text-4xl text-white mx-2">{pokemon.name}</h1>
        <h2 className="text-4xl text-white mx-2">#{pokemon.id}</h2>
      </div>

      <div className="flex flex-col items-center">
        <Image src={isShiny ? pokemon.shinyImage : pokemon.image} alt={pokemon.name} width={300} height={300} />
        <div className="flex gap-4 mt-4">
          <Image src={HeartBtn} alt="Heart Icon" onClick={toggleFavorite} className={`cursor-pointer w-[64px] h-[64px] ${isFavorite ? "opacity-100" : "opacity-50"}`} />
          <Image src={ShinyBtn} alt="Shiny Icon" onClick={toggleShiny} className="w-[64px] h-[64px] cursor-pointer" />
        </div>
      </div>

      <div className="mt-6 text-white">
        <h3 className="text-2xl font-bold">Type</h3>
        <p>{pokemon.types.join(", ")}</p>

        <h3 className="text-2xl font-bold mt-4">Location</h3>
        <p>{pokemon.location}</p>

        <h3 className="text-2xl font-bold mt-4">Moves</h3>
        <p>{pokemon.moves.join(", ")}</p>

        <h3 className="text-2xl font-bold mt-4">Abilities</h3>
        <p>{pokemon.abilities.join(", ")}</p>

        <h3 className="text-2xl font-bold mt-4">Evolutions</h3>
        <p>{pokemon.evolutions.length > 0 ? pokemon.evolutions.join(", ") : "None"}</p>
      </div>
    </div>
  );
};

export default PokeCard;
