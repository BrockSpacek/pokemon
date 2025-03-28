Brock Spacek
03/29/25
Pokemon API Rebuild
Description: 
Create a single page pokemon application using the Pokemonapi and Next.JS / TypeScript


Requirements:

using the Pokemon API https://pokeapi.co/
Ability to search by name and Pokedex Number
only Gen 1 - 5 pokemon
Ability to search by name and Pokedex Number
Ability to get a random pokemon
image of pokemon and shiny form
Pokemon Name
show 1 location from any game. If pokemon doesn't have a location, have it return "N/A"
Element Typing
All possible abilities
All possible moves
Show Evolutionary Paths, if pokemon doesn't have an evolutionary path, have it return "N/A"
And a Favorites list
Fully Responsive using Tailwind CSS https://tailwindcss.com
Have a Prototype in Figma (Desktop, Tablet, Mobile)

Peer Review: Bronel Lazar

Comments: Good job! Everything mostly works, looks good, and is responsive! I wasn't able to search up any of the Forces of Nature trio by name (Thundurus, Tornadus, Landorus) these are a strange case since they go by Thundurus-incarnate, Tornadus-incarnate, Landorus-incarnate, and then they have their therian forms of Thundurus-therian, Tornadus-therian, Landorus-therian. Even when I typed it by those names it didn't want to search it up except if I typed it by its pokedex id, then it would work. Another thing is when searching a pokemon over the id of 649, it does a good job of restricting it to be within gen 1-5 if I search by id; Though when I type the name of a pokemon beyond generation 5, it ends up populating the data. Also I noticed your vercel isn't up so make sure you fix any errors when you use 'npm run build' (Warnings should be okay) then you can host it on vercel. Other than that everything seems good!
