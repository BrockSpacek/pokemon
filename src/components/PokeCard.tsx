"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PokemonInterface } from "@/interface/interface";
import { getLocalStorage, saveToLocalStorageByName, removeFromLocalStorage } from "@/lib/DataServices";

interface PokeCardProps {
  pokemon: PokemonInterface;
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
  const [isShiny, setIsShiny] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    
    const favorites = getLocalStorage();
    setIsFavorite(favorites.includes(pokemon.name));
  }, [pokemon.name]);

  const toggleShiny = () => {
    setIsShiny(!isShiny);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromLocalStorage(pokemon.name);
    } else {
      saveToLocalStorageByName(pokemon.name);
    }
    setIsFavorite(!isFavorite); 
  };



  return (
    <div className="relative bg-[#b03535] text-white rounded-[15px] overflow-hidden mx-auto">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex">
          {/* Left Half of Card*/}
          <div className="w-1/2 p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h1 className="text-4xl font-bold mr-4">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                <h2 className="text-4xl">#{pokemon.id.toString().padStart(3, '0')}</h2>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={toggleFavorite} 
                  className={`w-16 h-16 bg-white rounded-full flex items-center justify-center hover:border-black hover:opacity-100 hover:border-2 
                    ${isFavorite ? 'opacity-100' : 'opacity-50'}`}
                >
                  ❤️
                </button>
                <button 
                  onClick={toggleShiny} 
                  className={`w-16 h-16 bg-white rounded-full flex items-center justify-center hover:border-black hover:opacity-100 hover:border-2 
                  ${isShiny ? 'opacity-100' : 'opacity-50'}`}
                >
                  ✨
                </button>
              </div>
            </div>

            <Image 
              src={isShiny ? pokemon.shinyImage : pokemon.image} 
              alt={pokemon.name} 
              width={400} 
              height={400} 
              className="mx-auto border-4 border-black bg-white rounded-full hover:bg-yellow-500 hover:border-white hover:border-8"
            />
          </div>

          {/* Right Half of Card */}
          <div className="w-1/2 p-6 bg-[#b03535b4]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-3xl font-bold mb-2 underline">Type</h3>
                <p className="text-lg">{pokemon.types.join(", ")}</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2 underline">Location</h3>
                <p className="text-lg">{pokemon.location}</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2 mt-14 underline">Abilities</h3>
                <div className="max-h-30 overflow-y-auto pr-2  scrollbar-track-[#b03535] scrollbar-thumb-white">
                  <p className="text-lg">{ pokemon.abilities.join(", ")}</p>
                </div>
              </div>
              <div>
              <h3 className="text-3xl font-bold mb-2 underline mt-14">Moves</h3>
                <div className="max-h-20 overflow-y-auto pr-2  scrollbar-track-[#b03535] scrollbar-thumb-white">
                  <p className="text-lg">{pokemon.moves.join(", ")}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-3xl font-bold mb-2 underline">Evolutions</h3>
              <div className="flex justify-between">
                {pokemon.evolutions.length > 0 ? (
                  pokemon.evolutions.map((evolution, index) => (
                    <div key={index} className="text-center">
                      <p className="text-lg">{evolution}</p>
                    </div>
                  ))
                ) : (
                  <p>No evolutions</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Layout */}
      <div className="hidden md:block lg:hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold mr-4">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
              <h2 className="text-3xl">#{pokemon.id.toString().padStart(3, '0')}</h2>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={toggleFavorite} 
                className={`w-12 h-12 bg-white rounded-full flex items-center justify-center hover:border-black hover:opacity-100 hover:border-2 
                  ${isFavorite ? 'opacity-100' : 'opacity-50'}`}
              >
                ❤️
              </button>
              <button 
                onClick={toggleShiny} 
                className={`w-12 h-12 bg-white rounded-full flex items-center justify-center hover:border-black hover:opacity-100 hover:border-2  ${isShiny ? 'opacity-100' : 'opacity-50'}`}
              >
                ✨
              </button>
            </div>
          </div>

          <Image 
            src={isShiny ? pokemon.shinyImage : pokemon.image} 
            alt={pokemon.name} 
            width={300} 
            height={300} 
            className="mx-auto mb-4 border-4 border-black bg-white rounded-full"
          />

          <div className="grid grid-cols-2 gap-4 text-center -mt-10">
            <div>
              <h3 className="text-2xl font-bold mb-2 underline">Type</h3>
              <p className="text-lg">{pokemon.types.join(", ")}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 underline">Location</h3>
              <p className="text-lg">{pokemon.location}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 underline">Moves</h3>
              <div className="max-h-20 overflow-y-auto pr-2  scrollbar-track-[#b03535] scrollbar-thumb-white">
                <p className="text-lg">{pokemon.moves.join(", ")}</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 underline">Abilities</h3>
              <div className="max-h-20 overflow-y-auto pr-2  scrollbar-track-[#b03535] scrollbar-thumb-white">
                <p className="text-lg">{pokemon.abilities.join(", ")}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold mb-2 underline">Evolutions</h3>
            <div className="text-center text-lg">
              {pokemon.evolutions.length > 0 ? (
                pokemon.evolutions.map((evolution, index) => (
                  <div key={index} className="text-center">
                    <p>{evolution}</p>
                  </div>
                ))
              ) : (
                <p>No evolutions</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
            <h2 className="text-2xl">#{pokemon.id.toString().padStart(3, '0')}</h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={toggleFavorite} 
              className={`w-10 h-10 bg-white rounded-full flex items-center justify-center hover:border-black hover:opacity-100 hover:border-2 
                ${isFavorite ? 'opacity-100' : 'opacity-50'}`}
            >
              ❤️
            </button>
            <button 
              onClick={toggleShiny} 
              className={`w-10 h-10 bg-white rounded-full flex items-center justify-center hover:border-black hover:opacity-100 hover:border-2  ${isShiny ? 'opacity-100' : 'opacity-50'}`}
            >
              ✨
            </button>
          </div>
        </div>

        <Image 
          src={isShiny ? pokemon.shinyImage: pokemon.image} 
          alt={pokemon.name} 
          width={250} 
          height={250} 
          className="mx-auto mb-4 border-4 border-black bg-white rounded-full"
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <h3 className="text-2xl font-bold mb-1 underline">Type</h3>
            <p className="text-lg">{pokemon.types.join(", ")}</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1 underline">Location</h3>
            <p className="text-lg">{pokemon.location}</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1 underline">Moves</h3>
            <div className="max-h-16 overflow-y-auto pr-2  scrollbar-track-[#b03535] scrollbar-thumb-white">
              <p className="text-lg">{pokemon.moves.join(", ")}</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1 underline">Abilities</h3>
            <div className="max-h-16 overflow-y-auto pr-2  scrollbar-track-[#b03535] scrollbar-thumb-white">
              <p className="text-lg">{pokemon.abilities.join(", ")}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-2 underline text-center">Evolutions</h3>
          <div className="text-center">
            {pokemon.evolutions.length > 0 ? (
              pokemon.evolutions.map((evolution, index) => (
                <div key={index} className="text-center">
                  <p className="text-lg">{evolution}</p>
                </div>
              ))
            ) : (
              <p className="text-sm">No evolutions</p>
            )}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default PokeCard;
