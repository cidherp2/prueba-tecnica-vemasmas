import { Routes, Route, useParams } from "react-router-dom";
import {PokemonListView}  from "./shared/components/PokemonlistView"
import { FavoritesView } from "././shared/components/FavoritosLiatView"
import { PokemonDetailLayout } from "./features/pokemonDetail";
import { usePokemonDetailController } from "./features/pokemonDetail/pokemonDetailController";


const PokemonDetailWrapper = () => {
  const { name } = useParams<{ name: string }>();
  if (!name) return <p>No se encontró el Pokémon</p>;

  const { data, isLoading, error } = usePokemonDetailController(name);

  if (isLoading) return <p>Cargando...</p>;
  if (error || !data) return <p>Error cargando Pokémon</p>;

  return <PokemonDetailLayout data={data} />;
};




 const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PokemonListView />} />
      <Route path="/favorites" element={<FavoritesView />} />
      <Route path="/pokemon/:name" element={<PokemonDetailWrapper />} />
 
    </Routes>
  );
};
export default AppRoutes;