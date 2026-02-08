import { useEffect, useRef } from "react";
import { usePokemonListController } from "../../features/pokemonList/usePokemonListController";
import {
  containerStyle,
  listItemStyle,
} from "../../features/pokemonList/styles";
import { useFavoritesStore } from "../../features/favorites/useFavoritesStore";
import { Link } from "react-router-dom";
import PikaChuSad from "../../../public/sadPika.png";
import BackButton from "./BackButton";

export const PokemonListView = () => {
  const {
    pokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
  } = usePokemonListController();

  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { rootMargin: "200px" },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    console.log("Search changed, focusing input");
    searchInputRef.current?.focus();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div style={containerStyle}>
    
      <input
        ref={searchInputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar Pokémon..."
        style={{ marginBottom: 12, padding: 6 }}
      />

      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        style={{ marginBottom: 16, padding: 6 }}
      >
        <option value="">Todos</option>
        <option value="fire">Fuego</option>
        <option value="water">Agua</option>
        <option value="grass">Planta</option>
      </select>

      <div
      style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}
      >

      <Link to="/favorites">
        <button
          style={{ marginBottom: 16, padding: "6px 12px", cursor: "pointer" }}
        >
          Ver Favoritos
        </button>
      </Link>
      <BackButton></BackButton>
      </div>

      {pokemons.map((pokemon) => {
        const favorited = isFavorite(pokemon.name);

        return (
          <div key={pokemon.name} style={listItemStyle}>
            <Link
              to={`/pokemon/${pokemon.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {pokemon.name}
            </Link>

            <button
              onClick={() =>
                favorited
                  ? removeFavorite(pokemon.name)
                  : addFavorite({
                      name: pokemon.name,
                      image:
                       ""
                    })
              }
              style={{
                marginLeft: 8,
                padding: "2px 6px",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {favorited ? "★" : "☆"}
            </button>
          </div>
        );
      })}

      <div ref={loadMoreRef} style={{ height: 1 }} />

      {isFetchingNextPage && <p>Cargando más...</p>}
      {isLoading && <p>Cargando Pokémon...</p>}

      {pokemons.length === 0 && !isLoading && (
        <>
          <p style={{ textAlign: "center", marginTop: 32 }}>
            No se encontraron Pokémon
          </p>
          <div className="ImageWrapper">
            <img
              src={PikaChuSad}
              alt="No results"
              style={{
                display: "block",
                margin: "16px auto",
                maxWidth: "100%",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
