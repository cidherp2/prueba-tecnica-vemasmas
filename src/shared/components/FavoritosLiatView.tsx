import { Link } from "react-router-dom";
import { useFavoritesStore } from "../../features/favorites/useFavoritesStore";
import { useQuery } from "@tanstack/react-query";
import "../../features/favorites/styles.css";
import {
  titleStyle,
  tableStyle,
  thTdStyle,
  imageStyle,
  removeButtonStyle,
} from "../../features/favorites/styles";
import BackButton from "./BackButton";

type PokemonImageProps = {
  name: string;
};

const PokemonImage = ({ name }: PokemonImageProps) => {
  const { data } = useQuery({
    queryKey: ["pokemonImage", name],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) throw new Error("Error fetching pokemon");
      return res.json();
    },
    staleTime: 1000 * 60 * 60,
  });

  const image =
    data?.sprites?.other?.["official-artwork"]?.front_default ||
    data?.sprites?.front_default;

  if (!image) return null;

  return <img src={image} alt={name} style={imageStyle} loading="lazy" />;
};

export const FavoritesView = () => {
  const { favorites, removeFavorite } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
        <><BackButton
            width="100%"
        ></BackButton><p style={{ textAlign: "center", marginTop: 40 }}>
                No tienes favoritos aún
            </p></>
    );
  }

  return (
    <div className="containerStyle">
        <BackButton
        width="100%"
        ></BackButton>
      <h2 style={titleStyle}> Tus Pokémon Favoritos</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Pokémon</th>
            <th style={thTdStyle}>Nombre</th>
            <th style={thTdStyle} />
          </tr>
        </thead>

        <tbody>
          {favorites.map((pokemon) => (
            <tr key={pokemon.name}>
              <td style={thTdStyle}>
                <PokemonImage name={pokemon.name} />
              </td>

              <td style={thTdStyle}>
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {pokemon.name.charAt(0).toUpperCase() +
                    pokemon.name.slice(1)}
                </Link>
              </td>

              <td style={thTdStyle}>
                <button
                  onClick={() => removeFavorite(pokemon.name)}
                  style={removeButtonStyle}
                  aria-label="Quitar de favoritos"
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
