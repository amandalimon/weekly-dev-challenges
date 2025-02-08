"use client";

import { useState, useEffect, useRef, JSX, ImgHTMLAttributes } from "react";

const getPokemon = async () => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    if (!res.ok) throw new Error("No se pudo obtener la lista de pokemon");

    const data = await res.json();
    const pokemonList = data.results;

    const pokemonListData = await Promise.all(
      pokemonList.map(async (pokemon: { url: string }) => {
        const pokemonUrl = pokemon.url;
        const pokemonDataRes = await fetch(pokemonUrl);
        if (!pokemonDataRes.ok)
          throw new Error("No se pudo obtener el pokemon");

        return await pokemonDataRes.json();
      })
    );

    return pokemonListData;
  } catch (e) {
    console.error(e);
    return [];
  }
};

type pokemon = {
  id: number;
  front_default: string;
}[];

export default function Home() {
  const [pokemons, setPokemons] = useState<pokemon>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPokemon();

        const formattedData = data.map((pokemon) => ({
          id: pokemon.id,
          front_default: pokemon.sprites.front_default,
        }));

        setPokemons(formattedData);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center m-4">
      <h1 className="text-2xl font-bold">Pokemon Lazy Image</h1>
      <div>
        {pokemons.map((pokemon) => (
          <LazyImage
            key={pokemon.id}
            src={pokemon?.front_default}
            className="w-48 h-48 mb-4 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

type LazyImageProps = { src: string };

type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImageProps & ImageNative;

export const LazyImage = ({ src, ...imgProps }: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);

  const [currentSrc, setCurrentSrc] = useState(
    "https://placehold.co/300/firebrick/white/?text=generating+pokemon&font=oswald"
  );

  useEffect(() => {
    // new observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSrc(src);
          }
        });
      },
      { threshold: 1.0 }
    );
    // observe node
    if (node.current) {
      observer.observe(node.current);
    }

    // disconect
    return () => {
      observer.disconnect();
    };
  }, [src]);

  return <img ref={node} src={currentSrc} {...imgProps} />;
};
