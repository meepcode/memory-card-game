import { useEffect, useState } from 'react'
import Card from './Card.tsx'

interface Pokemon {
    name: string,
    image: string,
    pokedexNum: number,
    // pokedexEntry: string,
}

function fillArray(start: number, end: number) {
    return Array.from(Array(end).keys()).map((num: number) => num + start);
}

// @ts-ignore
function Game({ numCards, numDisplay }: { numCards: number, numDisplay: number }) {
    const [ score, setScore ] = useState(0);
    const [ bestScore, setBestScore ] = useState(0);
    const [ cardsSelected, setCardsSelected ] = useState(new Set([]));
    const [ pokemons, setPokemons ] = useState(new Array<Pokemon>());
    const [ numGames, setNumGames ] = useState(0);

    useEffect(() => {
        console.log("Hello")
        async function getPokemons() {
            const array = bagRandomizer(fillArray(1, 151), numCards);
            let localPokemons: Pokemon[] = []
            for (const id of array) {
                const pokemon = await getPokemon(id)
                localPokemons.push(pokemon);
            }
            setPokemons(localPokemons);
        }
        getPokemons()
    }, [numGames]);

    function bagRandomizer<T>(initArray: T[], count: number): T[] {
        const bag = [];
        while (bag.length < count) {
            const index = Math.floor(Math.random() * initArray.length);
            bag.push(initArray[index]);
            initArray.splice(index, 1);
        }
        return bag;
    }

    async function getPokemon(pokedexNum: number) {
        const options = {
            method: "GET",
        };
        const resp = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokedexNum, options);
        const respJson = await resp.json();
        console.log(respJson)
        return {
            name: respJson.name,
            image: respJson.sprites.other["official-artwork"].front_default,
            pokedexNum: respJson.id
        }
    }

    return (
        <>
            <div id='score'>
                <p>Score: {score}</p>
                <p>Best Score: {bestScore}</p>
            </div>

            <div id='game-board'>
                {pokemons.map((pokemon, index) => {
                    return <Card pokemon={pokemon} key={pokemon.pokedexNum + "" + index} />
                }) // Use index as there may be duplicate pokemon cards entries
                }
            </div>
        </>
    )
}

export default Game;
export type { Pokemon };