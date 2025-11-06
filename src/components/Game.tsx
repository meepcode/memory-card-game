import { useEffect, useState } from 'react'
import Card from './Card.tsx'

import '/src/style/game.css'

interface Pokemon {
    name: string,
    image: string,
    pokedexNum: number,
    // pokedexEntry: string,
}

function fillArray(start: number, end: number) {
    return Array.from(Array(end).keys()).map((num: number) => num + start);
}

function Game({ numCards, numDisplay }: { numCards: number, numDisplay: number }) {
    const [ score, setScore ] = useState(0);
    const [ bestScore, setBestScore ] = useState(0);
    const [ cardsSelected, setCardsSelected ] = useState(new Set<Pokemon>([]));
    const [ pokemons, setPokemons ] = useState(new Array<Pokemon>());
    const [ pokemonCards, setPokemonCards ] = useState(new Array<Pokemon>());
    const [ gameWin, setGameWin ] = useState(Boolean);

    const winAnimationTime: number = 15

    const loadPokemon = () => {
        async function getPokemons() {
            const array = bagRandomizer(fillArray(1, 151), numCards);
            let localPokemons: Pokemon[] = []
            for (const id of array) {
                const pokemon = await getPokemon(id)
                localPokemons.push(pokemon);
            }
            setPokemons(localPokemons);
            return localPokemons
        }
        getPokemons()
    }

    const dealPokemon = (localPokemons: Pokemon[] = pokemons) => {
        // pick one pokemon that has not yet been shown
        const unusedPokemons = localPokemons.filter((pokemon) => !cardsSelected.has(pokemon));
        // console.log("Unclicked Pokemons: ", unusedPokemons, "Clicked Pokemons: ", cardsSelected);
        const newPokemon = unusedPokemons[Math.floor(Math.random() * unusedPokemons.length)]; 
        // put that in pokemonCards array
        let pokemonCardsTemp = [newPokemon];
        // pick numDisplay - 1 cards from the pokemon array (even if there has to be duplicates, or aren't enough to show)
        // put those in the pokemonCards array
        for (let i = 0; i < numDisplay - 1; i++) {
            const index = Math.floor(Math.random() * localPokemons.length);
            pokemonCardsTemp.push(localPokemons[index]);
        }
        // shuffle the pokemonCards array
        pokemonCardsTemp = bagRandomizer(pokemonCardsTemp, pokemonCardsTemp.length);
        if (pokemonCardsTemp.length !== numDisplay) {
            console.error("Temp Cards: " + pokemonCardsTemp.length + " Num Display: " + numDisplay);
        }
        setPokemonCards(pokemonCardsTemp);
    }

    const newGame = () => {
        setScore(0);
        setCardsSelected(new Set());
        loadPokemon();
    }

    const onClickPokemon = (pokemon: Pokemon) => {
        if (cardsSelected.has(pokemon)) {
            newGame();   
            return;
        } else {
            setScore(score + 1);
            if (cardsSelected.size === pokemons.length - 1) {
                setGameWin(true);
            } else {
                setCardsSelected(new Set([...cardsSelected, pokemon]));
            }
        }
    }

    useEffect(() => {
        loadPokemon();
    }, []);

    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score);
        }
    }, [score])

    useEffect(() => {
        if (pokemons.length !== 0) {
            dealPokemon();
        }
    }, [cardsSelected, pokemons, numDisplay])

    useEffect(() => {
        newGame();
    }, [numCards]);

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
                {gameWin ? (
                    <div className='won'>
                        <h1>You Win!</h1>
                        <div id='wonButtonDiv'>
                            <button onClick={newGame}>New Game</button>
                        </div>
                        {pokemons.map((pokemon, index) => {
                            let animationDelay = winAnimationTime / numCards * index * -1
                            return (
                                <div className='item' style={{animationDelay: animationDelay + "s"}}>
                                    <img 
                                        src={pokemon.image}
                                        className='subItem'
                                        width={100}
                                        height={100}
                                        style={{animationDelay: animationDelay + "s"}}
                                        />
                                </div>
                            )
                        })}
                    </div>
                ) : pokemonCards.map((pokemon, index) => {
                        return <Card pokemon={pokemon} key={pokemon.pokedexNum + " " + index} onClick={() => {onClickPokemon(pokemon)}}/> // Use index as there may be duplicate pokemon cards entries
                    }) 
                }
            </div>
        </>
    )
}

export default Game;
export type { Pokemon };