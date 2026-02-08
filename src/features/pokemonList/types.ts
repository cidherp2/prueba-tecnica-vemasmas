export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonPage {
  results: Pokemon[];
  nextOffset?: number;
}

export type FavoritePokemon = {
  name: string;
  image: string;
};