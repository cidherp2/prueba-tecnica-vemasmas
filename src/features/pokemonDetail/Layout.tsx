import React from "react";
import type { PokemonDetail } from "./services";
import {
  containerStyle,
  imageStyle,
  titleStyle,
  labelStyle,
  listItemStyle,
} from "./styles";
import { useFavoritesStore } from "../favorites/useFavoritesStore";
import BackButton from "../../shared/components/BackButton";

type Props = {
  data: PokemonDetail;
};

export const PokemonDetailLayout: React.FC<Props> = ({ data }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const image =
    data.sprites.other?.["official-artwork"]?.front_default ||
    data.sprites.front_default;

  const favorited = isFavorite(data.name);

  const handleFavorite = () => {
    if (favorited) {
      removeFavorite(data.name);
    } else {
      addFavorite({
        name: data.name,
        image: image!, // aquí ya existe
      });
    }
  };

  return (
    <div style={containerStyle}>
        <BackButton></BackButton>
      <h1 style={titleStyle}>{data.name}</h1>

      {image && <img src={image} alt={data.name} style={imageStyle} />}

      <button
        onClick={handleFavorite}
        style={{
          margin: "12px 0",
          padding: "6px 12px",
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        {favorited ? "★ Quitar de favoritos" : "☆ Agregar a favoritos"}
      </button>

      <div>
        <h2>Tipos:</h2>
        {data.types.map((t) => (
          <span key={t.type.name} style={listItemStyle}>
            <span style={labelStyle}>{t.type.name}</span>
          </span>
        ))}
      </div>

      <div>
        <h2>Stats:</h2>
        {data.stats.map((s) => (
          <div key={s.stat.name} style={listItemStyle}>
            <span style={labelStyle}>{s.stat.name}:</span> {s.base_stat}
          </div>
        ))}
      </div>

      <div>
        <h2>Habilidades:</h2>
        {data.abilities.map((a) => (
          <div key={a.ability.name} style={listItemStyle}>
            {a.ability.name}
          </div>
        ))}
      </div>
    </div>
  );
};
