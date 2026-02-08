export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonPage {
  results: Pokemon[];
  nextOffset?: number;
}

// Fetch paginado, con búsqueda opcional
export const fetchPokemons = async (offset = 0, search?: string): Promise<PokemonPage> => {
  const limit = 20;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await res.json();

  let results: Pokemon[] = data.results;

  if (search) {
    results = results.filter((p: Pokemon) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return {
    results,
    nextOffset: data.next ? offset + limit : undefined,
  };
};

// Fetch por tipo, con búsqueda opcional y paginación manual
export const fetchPokemonsByType = async (
  type: string,
  offset = 0,
  search?: string
): Promise<PokemonPage> => {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await res.json();

  let pokemons: Pokemon[] = data.pokemon.map((p: any) => p.pokemon);

  if (search) {
    pokemons = pokemons.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const limit = 20;
  const paginated = pokemons.slice(offset, offset + limit);
  const nextOffset = offset + limit < pokemons.length ? offset + limit : undefined;

  return {
    results: paginated,
    nextOffset,
  };
};
