import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetail, type PokemonDetail } from "./services";

export const usePokemonDetailController = (name: string) => {
  const query = useQuery<PokemonDetail, Error>({
    queryKey: ["pokemonDetail", name],
    queryFn: () => fetchPokemonDetail(name),
    staleTime: 1000 * 60 * 5, // 5 minutos
   
  });

  return query; 
};
