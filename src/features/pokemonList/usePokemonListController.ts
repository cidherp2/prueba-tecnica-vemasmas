import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemons, fetchPokemonsByType } from "./services";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import debounce from "just-debounce-it";
import type { PokemonPage } from "./types";

export const usePokemonListController = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "");

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const updateDebouncedSearch = useCallback(
    debounce((val: string) => setDebouncedSearch(val), 300),
    [],
  );

  // Actualizar URL params
  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (typeFilter) params.type = typeFilter;
    setSearchParams(params);
  }, [search, typeFilter, setSearchParams]);

  // Cuando cambia search, actualizar debouncedSearch
  useEffect(() => {
    updateDebouncedSearch(search);
  }, [search, updateDebouncedSearch]);

  const query = useInfiniteQuery<PokemonPage, Error>({
    queryKey: ["pokemons", debouncedSearch, typeFilter],
    queryFn: ({ pageParam = 0 }) =>
      typeFilter
        ? fetchPokemonsByType(typeFilter, pageParam as number, debouncedSearch)
        : fetchPokemons(pageParam as number, debouncedSearch),
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });

  const pokemons = query.data?.pages.flatMap((page) => page.results) ?? [];

  return {
    ...query,
    pokemons,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
  };
};
