// services.ts
export type PokemonDetail = {
  name: string;
  id: number;
  sprites: {
    front_default: string;
    other?: {
      "official-artwork"?: { front_default: string };
    };
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];
};

export const fetchPokemonDetail = async (name: string): Promise<PokemonDetail> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("Error al cargar Pokémon");
  return res.json();
};
