// import { usePokemonListController } from "./usePokemonListController";
// import { containerStyle, listItemStyle } from "./styles";
// import { useFavoritesStore } from "../favorites/useFavoritesStore";
// import { Link } from "react-router-dom";

// export const PokemonListLayout = () => {
//   const {
//     pokemons,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     error,
//     search,
//     setSearch,
//     typeFilter,
//     setTypeFilter,
//   } = usePokemonListController();

//   const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

//   return (
//     <div style={{ padding: 16 }}>
//       {/* Filtros */}
//       <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
//         <input
//           type="text"
//           placeholder="Buscar por nombre"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ flex: 1, padding: 8 }}
//         />
//         <select
//           value={typeFilter}
//           onChange={(e) => setTypeFilter(e.target.value)}
//           style={{ padding: 8 }}
//         >
//           <option value="">Todos los tipos</option>
//           <option value="fire">Fuego</option>
//           <option value="water">Agua</option>
//           <option value="grass">Planta</option>
//           <option value="electric">Eléctrico</option>
//           {/* Agrega más tipos según PokéAPI */}
//         </select>
//       </div>

//       {/* Lista */}
//       <div style={containerStyle}>
//         {pokemons.map((pokemon) => {
//           const favorited = isFavorite(pokemon.name);
//           return (
//             <div key={pokemon.name} style={listItemStyle}>
//               <Link to={`/pokemon/${pokemon.name}`} style={{ textDecoration: "none", color: "inherit" }}>
//                 {pokemon.name}
//               </Link>
//               <button
//                 onClick={() =>
//                   favorited ? removeFavorite(pokemon.name) : addFavorite(pokemon)
//                 }
//                 style={{ marginLeft: 8, padding: "2px 6px", fontSize: 12, cursor: "pointer" }}
//               >
//                 {favorited ? "★" : "☆"}
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {isFetchingNextPage && <p>Cargando más...</p>}
//     </div>
//   );
// };
