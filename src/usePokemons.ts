import { useState, useEffect } from "react";

const POKEMON_JSON_URL = "https://ameliapham.github.io/www.ameliart.fr/public/pokemons.json";

export type PokemonData = {
    id: number;
    name: string;
    image: string;
    base_stats: {
        hp: number;
        attack: number;
        defense: number;
        special_attack: number;
        special_defense: number;
        speed: number;
    };
};

export async function getPokemonsData(): Promise<PokemonData[]> {
    const response = await fetch(POKEMON_JSON_URL);

    // test if 404
    if (response.status === 404) {
        throw new Error("No pokemons at this url");
    }

    const pokemonsJson = await response.text();

    const pokemons = JSON.parse(pokemonsJson) as PokemonData[];

    return pokemons;
}

export function usePokemon() {
    const [pokemons, setPokemons] = useState<PokemonData[]>([]);

    const effect = () => {
        (async () => {
            const pokemons = await getPokemonsData();

            setPokemons(pokemons);
        })();
    };

    useEffect(effect, []);

    return { pokemons };
}
