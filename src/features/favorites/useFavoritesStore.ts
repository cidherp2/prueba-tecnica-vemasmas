import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FavoritePokemon = {
  name: string;
  image: string;
};



type FavoritesState = {
  favorites: FavoritePokemon[];
  addFavorite: (pokemon: FavoritePokemon) => void;
  removeFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (pokemon) =>
        set((state) => ({
          favorites: state.favorites.some(
            (fav) => fav.name === pokemon.name
          )
            ? state.favorites
            : [...state.favorites, pokemon],
        })),

      removeFavorite: (name) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (pokemon) => pokemon.name !== name
          ),
        })),

      isFavorite: (name) =>
        get().favorites.some((pokemon) => pokemon.name === name),
    }),
    {
      name: "pokemon-favorites",
    }
  )
);
